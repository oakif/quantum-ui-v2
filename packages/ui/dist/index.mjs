import { jsx as l, Fragment as Ve, jsxs as K } from "react/jsx-runtime";
import * as c from "react";
import j, { forwardRef as Ia, createElement as Rn, useState as Zd, useLayoutEffect as Qd, useMemo as Jd } from "react";
import * as So from "react-dom";
import eu from "react-dom";
function Ma(e) {
  var t, o, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var r = e.length;
    for (t = 0; t < r; t++) e[t] && (o = Ma(e[t])) && (n && (n += " "), n += o);
  } else for (o in e) e[o] && (n && (n += " "), n += o);
  return n;
}
function Da() {
  for (var e, t, o = 0, n = "", r = arguments.length; o < r; o++) (e = arguments[o]) && (t = Ma(e)) && (n && (n += " "), n += t);
  return n;
}
const Kn = "-", tu = (e) => {
  const t = nu(e), {
    conflictingClassGroups: o,
    conflictingClassGroupModifiers: n
  } = e;
  return {
    getClassGroupId: (i) => {
      const s = i.split(Kn);
      return s[0] === "" && s.length !== 1 && s.shift(), Oa(s, t) || ou(i);
    },
    getConflictingClassGroupIds: (i, s) => {
      const d = o[i] || [];
      return s && n[i] ? [...d, ...n[i]] : d;
    }
  };
}, Oa = (e, t) => {
  if (e.length === 0)
    return t.classGroupId;
  const o = e[0], n = t.nextPart.get(o), r = n ? Oa(e.slice(1), n) : void 0;
  if (r)
    return r;
  if (t.validators.length === 0)
    return;
  const a = e.join(Kn);
  return t.validators.find(({
    validator: i
  }) => i(a))?.classGroupId;
}, Kr = /^\[(.+)\]$/, ou = (e) => {
  if (Kr.test(e)) {
    const t = Kr.exec(e)[1], o = t?.substring(0, t.indexOf(":"));
    if (o)
      return "arbitrary.." + o;
  }
}, nu = (e) => {
  const {
    theme: t,
    classGroups: o
  } = e, n = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  for (const r in o)
    En(o[r], n, r, t);
  return n;
}, En = (e, t, o, n) => {
  e.forEach((r) => {
    if (typeof r == "string") {
      const a = r === "" ? t : jr(t, r);
      a.classGroupId = o;
      return;
    }
    if (typeof r == "function") {
      if (ru(r)) {
        En(r(n), t, o, n);
        return;
      }
      t.validators.push({
        validator: r,
        classGroupId: o
      });
      return;
    }
    Object.entries(r).forEach(([a, i]) => {
      En(i, jr(t, a), o, n);
    });
  });
}, jr = (e, t) => {
  let o = e;
  return t.split(Kn).forEach((n) => {
    o.nextPart.has(n) || o.nextPart.set(n, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), o = o.nextPart.get(n);
  }), o;
}, ru = (e) => e.isThemeGetter, au = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, o = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  const r = (a, i) => {
    o.set(a, i), t++, t > e && (t = 0, n = o, o = /* @__PURE__ */ new Map());
  };
  return {
    get(a) {
      let i = o.get(a);
      if (i !== void 0)
        return i;
      if ((i = n.get(a)) !== void 0)
        return r(a, i), i;
    },
    set(a, i) {
      o.has(a) ? o.set(a, i) : r(a, i);
    }
  };
}, Pn = "!", _n = ":", iu = _n.length, su = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: o
  } = e;
  let n = (r) => {
    const a = [];
    let i = 0, s = 0, d = 0, f;
    for (let h = 0; h < r.length; h++) {
      let g = r[h];
      if (i === 0 && s === 0) {
        if (g === _n) {
          a.push(r.slice(d, h)), d = h + iu;
          continue;
        }
        if (g === "/") {
          f = h;
          continue;
        }
      }
      g === "[" ? i++ : g === "]" ? i-- : g === "(" ? s++ : g === ")" && s--;
    }
    const u = a.length === 0 ? r : r.substring(d), p = lu(u), m = p !== u, v = f && f > d ? f - d : void 0;
    return {
      modifiers: a,
      hasImportantModifier: m,
      baseClassName: p,
      maybePostfixModifierPosition: v
    };
  };
  if (t) {
    const r = t + _n, a = n;
    n = (i) => i.startsWith(r) ? a(i.substring(r.length)) : {
      isExternal: !0,
      modifiers: [],
      hasImportantModifier: !1,
      baseClassName: i,
      maybePostfixModifierPosition: void 0
    };
  }
  if (o) {
    const r = n;
    n = (a) => o({
      className: a,
      parseClassName: r
    });
  }
  return n;
}, lu = (e) => e.endsWith(Pn) ? e.substring(0, e.length - 1) : e.startsWith(Pn) ? e.substring(1) : e, cu = (e) => {
  const t = Object.fromEntries(e.orderSensitiveModifiers.map((n) => [n, !0]));
  return (n) => {
    if (n.length <= 1)
      return n;
    const r = [];
    let a = [];
    return n.forEach((i) => {
      i[0] === "[" || t[i] ? (r.push(...a.sort(), i), a = []) : a.push(i);
    }), r.push(...a.sort()), r;
  };
}, du = (e) => ({
  cache: au(e.cacheSize),
  parseClassName: su(e),
  sortModifiers: cu(e),
  ...tu(e)
}), uu = /\s+/, fu = (e, t) => {
  const {
    parseClassName: o,
    getClassGroupId: n,
    getConflictingClassGroupIds: r,
    sortModifiers: a
  } = t, i = [], s = e.trim().split(uu);
  let d = "";
  for (let f = s.length - 1; f >= 0; f -= 1) {
    const u = s[f], {
      isExternal: p,
      modifiers: m,
      hasImportantModifier: v,
      baseClassName: h,
      maybePostfixModifierPosition: g
    } = o(u);
    if (p) {
      d = u + (d.length > 0 ? " " + d : d);
      continue;
    }
    let b = !!g, w = n(b ? h.substring(0, g) : h);
    if (!w) {
      if (!b) {
        d = u + (d.length > 0 ? " " + d : d);
        continue;
      }
      if (w = n(h), !w) {
        d = u + (d.length > 0 ? " " + d : d);
        continue;
      }
      b = !1;
    }
    const x = a(m).join(":"), y = v ? x + Pn : x, S = y + w;
    if (i.includes(S))
      continue;
    i.push(S);
    const R = r(w, b);
    for (let T = 0; T < R.length; ++T) {
      const A = R[T];
      i.push(y + A);
    }
    d = u + (d.length > 0 ? " " + d : d);
  }
  return d;
};
function pu() {
  let e = 0, t, o, n = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (o = La(t)) && (n && (n += " "), n += o);
  return n;
}
const La = (e) => {
  if (typeof e == "string")
    return e;
  let t, o = "";
  for (let n = 0; n < e.length; n++)
    e[n] && (t = La(e[n])) && (o && (o += " "), o += t);
  return o;
};
function mu(e, ...t) {
  let o, n, r, a = i;
  function i(d) {
    const f = t.reduce((u, p) => p(u), e());
    return o = du(f), n = o.cache.get, r = o.cache.set, a = s, s(d);
  }
  function s(d) {
    const f = n(d);
    if (f)
      return f;
    const u = fu(d, o);
    return r(d, u), u;
  }
  return function() {
    return a(pu.apply(null, arguments));
  };
}
const ie = (e) => {
  const t = (o) => o[e] || [];
  return t.isThemeGetter = !0, t;
}, $a = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, za = /^\((?:(\w[\w-]*):)?(.+)\)$/i, gu = /^\d+\/\d+$/, vu = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, hu = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, bu = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, wu = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, xu = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, st = (e) => gu.test(e), W = (e) => !!e && !Number.isNaN(Number(e)), ze = (e) => !!e && Number.isInteger(Number(e)), cn = (e) => e.endsWith("%") && W(e.slice(0, -1)), Ie = (e) => vu.test(e), yu = () => !0, Cu = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  hu.test(e) && !bu.test(e)
), Fa = () => !1, Su = (e) => wu.test(e), Ru = (e) => xu.test(e), Eu = (e) => !D(e) && !O(e), Pu = (e) => bt(e, Ga, Fa), D = (e) => $a.test(e), Qe = (e) => bt(e, Ha, Cu), dn = (e) => bt(e, ku, W), Yr = (e) => bt(e, Ba, Fa), _u = (e) => bt(e, Va, Ru), Xt = (e) => bt(e, Wa, Su), O = (e) => za.test(e), Pt = (e) => wt(e, Ha), Au = (e) => wt(e, Iu), Xr = (e) => wt(e, Ba), Nu = (e) => wt(e, Ga), Tu = (e) => wt(e, Va), qt = (e) => wt(e, Wa, !0), bt = (e, t, o) => {
  const n = $a.exec(e);
  return n ? n[1] ? t(n[1]) : o(n[2]) : !1;
}, wt = (e, t, o = !1) => {
  const n = za.exec(e);
  return n ? n[1] ? t(n[1]) : o : !1;
}, Ba = (e) => e === "position" || e === "percentage", Va = (e) => e === "image" || e === "url", Ga = (e) => e === "length" || e === "size" || e === "bg-size", Ha = (e) => e === "length", ku = (e) => e === "number", Iu = (e) => e === "family-name", Wa = (e) => e === "shadow", Mu = () => {
  const e = ie("color"), t = ie("font"), o = ie("text"), n = ie("font-weight"), r = ie("tracking"), a = ie("leading"), i = ie("breakpoint"), s = ie("container"), d = ie("spacing"), f = ie("radius"), u = ie("shadow"), p = ie("inset-shadow"), m = ie("text-shadow"), v = ie("drop-shadow"), h = ie("blur"), g = ie("perspective"), b = ie("aspect"), w = ie("ease"), x = ie("animate"), y = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], S = () => [
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
  ], R = () => [...S(), O, D], T = () => ["auto", "hidden", "clip", "visible", "scroll"], A = () => ["auto", "contain", "none"], E = () => [O, D, d], M = () => [st, "full", "auto", ...E()], $ = () => [ze, "none", "subgrid", O, D], z = () => ["auto", {
    span: ["full", ze, O, D]
  }, ze, O, D], V = () => [ze, "auto", O, D], H = () => ["auto", "min", "max", "fr", O, D], G = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], U = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], L = () => ["auto", ...E()], B = () => [st, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...E()], P = () => [e, O, D], I = () => [...S(), Xr, Yr, {
    position: [O, D]
  }], ee = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], le = () => ["auto", "cover", "contain", Nu, Pu, {
    size: [O, D]
  }], fe = () => [cn, Pt, Qe], Q = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    f,
    O,
    D
  ], Z = () => ["", W, Pt, Qe], pe = () => ["solid", "dashed", "dotted", "double"], ce = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], N = () => [W, cn, Xr, Yr], X = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    h,
    O,
    D
  ], re = () => ["none", W, O, D], Y = () => ["none", W, O, D], q = () => [W, O, D], J = () => [st, "full", ...E()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Ie],
      breakpoint: [Ie],
      color: [yu],
      container: [Ie],
      "drop-shadow": [Ie],
      ease: ["in", "out", "in-out"],
      font: [Eu],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Ie],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Ie],
      shadow: [Ie],
      spacing: ["px", W],
      text: [Ie],
      "text-shadow": [Ie],
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
        aspect: ["auto", "square", st, D, O, b]
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
        columns: [W, D, O, s]
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
        object: R()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: T()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": T()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": T()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: A()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": A()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": A()
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
        z: [ze, "auto", O, D]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [st, "full", "auto", s, ...E()]
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
        flex: [W, st, "auto", "initial", "none", D]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", W, O, D]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", W, O, D]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [ze, "first", "last", "none", O, D]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": $()
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
        "col-start": V()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": V()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": $()
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
        "row-start": V()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": V()
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
        "auto-cols": H()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": H()
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
        justify: [...G(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...U(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...U()]
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
        items: [...U(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...U(), {
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
        "place-items": [...U(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...U()]
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
        m: L()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: L()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: L()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: L()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: L()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: L()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: L()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: L()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: L()
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
        size: B()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [s, "screen", ...B()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          s,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...B()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          s,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [i]
          },
          ...B()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...B()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...B()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...B()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", o, Pt, Qe]
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
        font: [n, O, dn]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", cn, D]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Au, D, t]
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
        tracking: [r, O, D]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [W, "none", O, dn]
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
        "list-image": ["none", O, D]
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
        list: ["disc", "decimal", "none", O, D]
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
        decoration: [...pe(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [W, "from-font", "auto", O, Qe]
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
        "underline-offset": [W, "auto", O, D]
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
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", O, D]
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
        content: ["none", O, D]
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
        bg: I()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ee()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: le()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, ze, O, D],
          radial: ["", O, D],
          conic: [ze, O, D]
        }, Tu, _u]
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
        from: fe()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: fe()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: fe()
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
        rounded: Q()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": Q()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": Q()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": Q()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": Q()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": Q()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": Q()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": Q()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": Q()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": Q()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": Q()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": Q()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": Q()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": Q()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": Q()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: Z()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": Z()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": Z()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": Z()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": Z()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": Z()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": Z()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": Z()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": Z()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": Z()
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
        "divide-y": Z()
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
        border: [...pe(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...pe(), "hidden", "none"]
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
        outline: [...pe(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [W, O, D]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", W, Pt, Qe]
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
          qt,
          Xt
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
        "inset-shadow": ["none", p, qt, Xt]
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
        ring: Z()
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
        "ring-offset": [W, Qe]
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
        "inset-ring": Z()
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
        "text-shadow": ["none", m, qt, Xt]
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
        opacity: [W, O, D]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...ce(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": ce()
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
        "mask-linear": [W]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": N()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": N()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": P()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": P()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": N()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": N()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": P()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": P()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": N()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": N()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": P()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": P()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": N()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": N()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": P()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": P()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": N()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": N()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": P()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": P()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": N()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": N()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": P()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": P()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": N()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": N()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": P()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": P()
      }],
      "mask-image-radial": [{
        "mask-radial": [O, D]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": N()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": N()
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
        "mask-conic": [W]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": N()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": N()
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
        mask: I()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: ee()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: le()
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
        mask: ["none", O, D]
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
          O,
          D
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: X()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [W, O, D]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [W, O, D]
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
          v,
          qt,
          Xt
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
        grayscale: ["", W, O, D]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [W, O, D]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", W, O, D]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [W, O, D]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", W, O, D]
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
          O,
          D
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": X()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [W, O, D]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [W, O, D]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", W, O, D]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [W, O, D]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", W, O, D]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [W, O, D]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [W, O, D]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", W, O, D]
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
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", O, D]
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
        duration: [W, "initial", O, D]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", w, O, D]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [W, O, D]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", x, O, D]
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
        perspective: [g, O, D]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": R()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: re()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": re()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": re()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": re()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: Y()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": Y()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": Y()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": Y()
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
        skew: q()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": q()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": q()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [O, D, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: R()
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
        translate: J()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": J()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": J()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": J()
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
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", O, D]
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
        "will-change": ["auto", "scroll", "contents", "transform", O, D]
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
        stroke: [W, Pt, Qe, dn]
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
}, Du = /* @__PURE__ */ mu(Mu);
function C(...e) {
  return Du(Da(e));
}
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ou = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), Ua = (...e) => e.filter((t, o, n) => !!t && t.trim() !== "" && n.indexOf(t) === o).join(" ").trim();
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Lu = {
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
const $u = Ia(
  ({
    color: e = "currentColor",
    size: t = 24,
    strokeWidth: o = 2,
    absoluteStrokeWidth: n,
    className: r = "",
    children: a,
    iconNode: i,
    ...s
  }, d) => Rn(
    "svg",
    {
      ref: d,
      ...Lu,
      width: t,
      height: t,
      stroke: e,
      strokeWidth: n ? Number(o) * 24 / Number(t) : o,
      className: Ua("lucide", r),
      ...s
    },
    [
      ...i.map(([f, u]) => Rn(f, u)),
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
const Oe = (e, t) => {
  const o = Ia(
    ({ className: n, ...r }, a) => Rn($u, {
      ref: a,
      iconNode: t,
      className: Ua(`lucide-${Ou(e)}`, n),
      ...r
    })
  );
  return o.displayName = `${e}`, o;
};
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zu = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]], jn = Oe("Check", zu);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fu = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]], Ro = Oe("ChevronDown", Fu);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bu = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]], Vu = Oe("ChevronLeft", Bu);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gu = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]], Yn = Oe("ChevronRight", Gu);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hu = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]], Wu = Oe("ChevronUp", Hu);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uu = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]], Ka = Oe("Circle", Uu);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ku = [
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }],
  ["circle", { cx: "19", cy: "12", r: "1", key: "1wjl8i" }],
  ["circle", { cx: "5", cy: "12", r: "1", key: "1pcz8c" }]
], ja = Oe("Ellipsis", Ku);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ju = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]], Yu = Oe("LoaderCircle", ju);
/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xu = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
], Ya = Oe("X", Xu);
function qr(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function Eo(...e) {
  return (t) => {
    let o = !1;
    const n = e.map((r) => {
      const a = qr(r, t);
      return !o && typeof a == "function" && (o = !0), a;
    });
    if (o)
      return () => {
        for (let r = 0; r < n.length; r++) {
          const a = n[r];
          typeof a == "function" ? a() : qr(e[r], null);
        }
      };
  };
}
function F(...e) {
  return c.useCallback(Eo(...e), e);
}
// @__NO_SIDE_EFFECTS__
function Ge(e) {
  const t = /* @__PURE__ */ qu(e), o = c.forwardRef((n, r) => {
    const { children: a, ...i } = n, s = c.Children.toArray(a), d = s.find(Zu);
    if (d) {
      const f = d.props.children, u = s.map((p) => p === d ? c.Children.count(f) > 1 ? c.Children.only(null) : c.isValidElement(f) ? f.props.children : null : p);
      return /* @__PURE__ */ l(t, { ...i, ref: r, children: c.isValidElement(f) ? c.cloneElement(f, void 0, u) : null });
    }
    return /* @__PURE__ */ l(t, { ...i, ref: r, children: a });
  });
  return o.displayName = `${e}.Slot`, o;
}
var Po = /* @__PURE__ */ Ge("Slot");
// @__NO_SIDE_EFFECTS__
function qu(e) {
  const t = c.forwardRef((o, n) => {
    const { children: r, ...a } = o;
    if (c.isValidElement(r)) {
      const i = Ju(r), s = Qu(a, r.props);
      return r.type !== c.Fragment && (s.ref = n ? Eo(n, i) : i), c.cloneElement(r, s);
    }
    return c.Children.count(r) > 1 ? c.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Xa = Symbol("radix.slottable");
// @__NO_SIDE_EFFECTS__
function qa(e) {
  const t = ({ children: o }) => /* @__PURE__ */ l(Ve, { children: o });
  return t.displayName = `${e}.Slottable`, t.__radixId = Xa, t;
}
function Zu(e) {
  return c.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Xa;
}
function Qu(e, t) {
  const o = { ...t };
  for (const n in t) {
    const r = e[n], a = t[n];
    /^on[A-Z]/.test(n) ? r && a ? o[n] = (...s) => {
      const d = a(...s);
      return r(...s), d;
    } : r && (o[n] = r) : n === "style" ? o[n] = { ...r, ...a } : n === "className" && (o[n] = [r, a].filter(Boolean).join(" "));
  }
  return { ...e, ...o };
}
function Ju(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, o = t && "isReactWarning" in t && t.isReactWarning;
  return o ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, o = t && "isReactWarning" in t && t.isReactWarning, o ? e.props.ref : e.props.ref || e.ref);
}
var ef = [
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
], k = ef.reduce((e, t) => {
  const o = /* @__PURE__ */ Ge(`Primitive.${t}`), n = c.forwardRef((r, a) => {
    const { asChild: i, ...s } = r, d = i ? o : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ l(d, { ...s, ref: a });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {});
function Za(e, t) {
  e && So.flushSync(() => e.dispatchEvent(t));
}
var Qa = Object.freeze({
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
}), tf = "VisuallyHidden", Ja = c.forwardRef(
  (e, t) => /* @__PURE__ */ l(
    k.span,
    {
      ...e,
      ref: t,
      style: { ...Qa, ...e.style }
    }
  )
);
Ja.displayName = tf;
var of = Ja;
function nf(e, t) {
  const o = c.createContext(t), n = (a) => {
    const { children: i, ...s } = a, d = c.useMemo(() => s, Object.values(s));
    return /* @__PURE__ */ l(o.Provider, { value: d, children: i });
  };
  n.displayName = e + "Provider";
  function r(a) {
    const i = c.useContext(o);
    if (i) return i;
    if (t !== void 0) return t;
    throw new Error(`\`${a}\` must be used within \`${e}\``);
  }
  return [n, r];
}
function te(e, t = []) {
  let o = [];
  function n(a, i) {
    const s = c.createContext(i), d = o.length;
    o = [...o, i];
    const f = (p) => {
      const { scope: m, children: v, ...h } = p, g = m?.[e]?.[d] || s, b = c.useMemo(() => h, Object.values(h));
      return /* @__PURE__ */ l(g.Provider, { value: b, children: v });
    };
    f.displayName = a + "Provider";
    function u(p, m) {
      const v = m?.[e]?.[d] || s, h = c.useContext(v);
      if (h) return h;
      if (i !== void 0) return i;
      throw new Error(`\`${p}\` must be used within \`${a}\``);
    }
    return [f, u];
  }
  const r = () => {
    const a = o.map((i) => c.createContext(i));
    return function(s) {
      const d = s?.[e] || a;
      return c.useMemo(
        () => ({ [`__scope${e}`]: { ...s, [e]: d } }),
        [s, d]
      );
    };
  };
  return r.scopeName = e, [n, rf(r, ...t)];
}
function rf(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const o = () => {
    const n = e.map((r) => ({
      useScope: r(),
      scopeName: r.scopeName
    }));
    return function(a) {
      const i = n.reduce((s, { useScope: d, scopeName: f }) => {
        const p = d(a)[`__scope${f}`];
        return { ...s, ...p };
      }, {});
      return c.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return o.scopeName = t.scopeName, o;
}
function Ot(e) {
  const t = e + "CollectionProvider", [o, n] = te(t), [r, a] = o(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), i = (g) => {
    const { scope: b, children: w } = g, x = j.useRef(null), y = j.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ l(r, { scope: b, itemMap: y, collectionRef: x, children: w });
  };
  i.displayName = t;
  const s = e + "CollectionSlot", d = /* @__PURE__ */ Ge(s), f = j.forwardRef(
    (g, b) => {
      const { scope: w, children: x } = g, y = a(s, w), S = F(b, y.collectionRef);
      return /* @__PURE__ */ l(d, { ref: S, children: x });
    }
  );
  f.displayName = s;
  const u = e + "CollectionItemSlot", p = "data-radix-collection-item", m = /* @__PURE__ */ Ge(u), v = j.forwardRef(
    (g, b) => {
      const { scope: w, children: x, ...y } = g, S = j.useRef(null), R = F(b, S), T = a(u, w);
      return j.useEffect(() => (T.itemMap.set(S, { ref: S, ...y }), () => void T.itemMap.delete(S))), /* @__PURE__ */ l(m, { [p]: "", ref: R, children: x });
    }
  );
  v.displayName = u;
  function h(g) {
    const b = a(e + "CollectionConsumer", g);
    return j.useCallback(() => {
      const x = b.collectionRef.current;
      if (!x) return [];
      const y = Array.from(x.querySelectorAll(`[${p}]`));
      return Array.from(b.itemMap.values()).sort(
        (T, A) => y.indexOf(T.ref.current) - y.indexOf(A.ref.current)
      );
    }, [b.collectionRef, b.itemMap]);
  }
  return [
    { Provider: i, Slot: f, ItemSlot: v },
    h,
    n
  ];
}
function _(e, t, { checkForDefaultPrevented: o = !0 } = {}) {
  return function(r) {
    if (e?.(r), o === !1 || !r.defaultPrevented)
      return t?.(r);
  };
}
var ne = globalThis?.document ? c.useLayoutEffect : () => {
}, af = c[" useInsertionEffect ".trim().toString()] || ne;
function ae({
  prop: e,
  defaultProp: t,
  onChange: o = () => {
  },
  caller: n
}) {
  const [r, a, i] = sf({
    defaultProp: t,
    onChange: o
  }), s = e !== void 0, d = s ? e : r;
  {
    const u = c.useRef(e !== void 0);
    c.useEffect(() => {
      const p = u.current;
      p !== s && console.warn(
        `${n} is changing from ${p ? "controlled" : "uncontrolled"} to ${s ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), u.current = s;
    }, [s, n]);
  }
  const f = c.useCallback(
    (u) => {
      if (s) {
        const p = lf(u) ? u(e) : u;
        p !== e && i.current?.(p);
      } else
        a(u);
    },
    [s, e, a, i]
  );
  return [d, f];
}
function sf({
  defaultProp: e,
  onChange: t
}) {
  const [o, n] = c.useState(e), r = c.useRef(o), a = c.useRef(t);
  return af(() => {
    a.current = t;
  }, [t]), c.useEffect(() => {
    r.current !== o && (a.current?.(o), r.current = o);
  }, [o, r]), [o, n, a];
}
function lf(e) {
  return typeof e == "function";
}
function cf(e, t) {
  return c.useReducer((o, n) => t[o][n] ?? o, e);
}
var oe = (e) => {
  const { present: t, children: o } = e, n = df(t), r = typeof o == "function" ? o({ present: n.isPresent }) : c.Children.only(o), a = F(n.ref, uf(r));
  return typeof o == "function" || n.isPresent ? c.cloneElement(r, { ref: a }) : null;
};
oe.displayName = "Presence";
function df(e) {
  const [t, o] = c.useState(), n = c.useRef(null), r = c.useRef(e), a = c.useRef("none"), i = e ? "mounted" : "unmounted", [s, d] = cf(i, {
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
    const f = Zt(n.current);
    a.current = s === "mounted" ? f : "none";
  }, [s]), ne(() => {
    const f = n.current, u = r.current;
    if (u !== e) {
      const m = a.current, v = Zt(f);
      e ? d("MOUNT") : v === "none" || f?.display === "none" ? d("UNMOUNT") : d(u && m !== v ? "ANIMATION_OUT" : "UNMOUNT"), r.current = e;
    }
  }, [e, d]), ne(() => {
    if (t) {
      let f;
      const u = t.ownerDocument.defaultView ?? window, p = (v) => {
        const g = Zt(n.current).includes(CSS.escape(v.animationName));
        if (v.target === t && g && (d("ANIMATION_END"), !r.current)) {
          const b = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", f = u.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = b);
          });
        }
      }, m = (v) => {
        v.target === t && (a.current = Zt(n.current));
      };
      return t.addEventListener("animationstart", m), t.addEventListener("animationcancel", p), t.addEventListener("animationend", p), () => {
        u.clearTimeout(f), t.removeEventListener("animationstart", m), t.removeEventListener("animationcancel", p), t.removeEventListener("animationend", p);
      };
    } else
      d("ANIMATION_END");
  }, [t, d]), {
    isPresent: ["mounted", "unmountSuspended"].includes(s),
    ref: c.useCallback((f) => {
      n.current = f ? getComputedStyle(f) : null, o(f);
    }, [])
  };
}
function Zt(e) {
  return e?.animationName || "none";
}
function uf(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get, o = t && "isReactWarning" in t && t.isReactWarning;
  return o ? e.ref : (t = Object.getOwnPropertyDescriptor(e, "ref")?.get, o = t && "isReactWarning" in t && t.isReactWarning, o ? e.props.ref : e.props.ref || e.ref);
}
var ff = c[" useId ".trim().toString()] || (() => {
}), pf = 0;
function de(e) {
  const [t, o] = c.useState(ff());
  return ne(() => {
    o((n) => n ?? String(pf++));
  }, [e]), t ? `radix-${t}` : "";
}
var _o = "Collapsible", [mf, ei] = te(_o), [gf, Xn] = mf(_o), ti = c.forwardRef(
  (e, t) => {
    const {
      __scopeCollapsible: o,
      open: n,
      defaultOpen: r,
      disabled: a,
      onOpenChange: i,
      ...s
    } = e, [d, f] = ae({
      prop: n,
      defaultProp: r ?? !1,
      onChange: i,
      caller: _o
    });
    return /* @__PURE__ */ l(
      gf,
      {
        scope: o,
        disabled: a,
        contentId: de(),
        open: d,
        onOpenToggle: c.useCallback(() => f((u) => !u), [f]),
        children: /* @__PURE__ */ l(
          k.div,
          {
            "data-state": Jn(d),
            "data-disabled": a ? "" : void 0,
            ...s,
            ref: t
          }
        )
      }
    );
  }
);
ti.displayName = _o;
var oi = "CollapsibleTrigger", qn = c.forwardRef(
  (e, t) => {
    const { __scopeCollapsible: o, ...n } = e, r = Xn(oi, o);
    return /* @__PURE__ */ l(
      k.button,
      {
        type: "button",
        "aria-controls": r.contentId,
        "aria-expanded": r.open || !1,
        "data-state": Jn(r.open),
        "data-disabled": r.disabled ? "" : void 0,
        disabled: r.disabled,
        ...n,
        ref: t,
        onClick: _(e.onClick, r.onOpenToggle)
      }
    );
  }
);
qn.displayName = oi;
var Zn = "CollapsibleContent", Qn = c.forwardRef(
  (e, t) => {
    const { forceMount: o, ...n } = e, r = Xn(Zn, e.__scopeCollapsible);
    return /* @__PURE__ */ l(oe, { present: o || r.open, children: ({ present: a }) => /* @__PURE__ */ l(vf, { ...n, ref: t, present: a }) });
  }
);
Qn.displayName = Zn;
var vf = c.forwardRef((e, t) => {
  const { __scopeCollapsible: o, present: n, children: r, ...a } = e, i = Xn(Zn, o), [s, d] = c.useState(n), f = c.useRef(null), u = F(t, f), p = c.useRef(0), m = p.current, v = c.useRef(0), h = v.current, g = i.open || s, b = c.useRef(g), w = c.useRef(void 0);
  return c.useEffect(() => {
    const x = requestAnimationFrame(() => b.current = !1);
    return () => cancelAnimationFrame(x);
  }, []), ne(() => {
    const x = f.current;
    if (x) {
      w.current = w.current || {
        transitionDuration: x.style.transitionDuration,
        animationName: x.style.animationName
      }, x.style.transitionDuration = "0s", x.style.animationName = "none";
      const y = x.getBoundingClientRect();
      p.current = y.height, v.current = y.width, b.current || (x.style.transitionDuration = w.current.transitionDuration, x.style.animationName = w.current.animationName), d(n);
    }
  }, [i.open, n]), /* @__PURE__ */ l(
    k.div,
    {
      "data-state": Jn(i.open),
      "data-disabled": i.disabled ? "" : void 0,
      id: i.contentId,
      hidden: !g,
      ...a,
      ref: u,
      style: {
        "--radix-collapsible-content-height": m ? `${m}px` : void 0,
        "--radix-collapsible-content-width": h ? `${h}px` : void 0,
        ...e.style
      },
      children: g && r
    }
  );
});
function Jn(e) {
  return e ? "open" : "closed";
}
var ni = ti, hf = qn, bf = Qn, wf = c.createContext(void 0);
function Le(e) {
  const t = c.useContext(wf);
  return e || t || "ltr";
}
var Se = "Accordion", xf = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [er, yf, Cf] = Ot(Se), [Ao, Vx] = te(Se, [
  Cf,
  ei
]), tr = ei(), ri = j.forwardRef(
  (e, t) => {
    const { type: o, ...n } = e, r = n, a = n;
    return /* @__PURE__ */ l(er.Provider, { scope: e.__scopeAccordion, children: o === "multiple" ? /* @__PURE__ */ l(Pf, { ...a, ref: t }) : /* @__PURE__ */ l(Ef, { ...r, ref: t }) });
  }
);
ri.displayName = Se;
var [ai, Sf] = Ao(Se), [ii, Rf] = Ao(
  Se,
  { collapsible: !1 }
), Ef = j.forwardRef(
  (e, t) => {
    const {
      value: o,
      defaultValue: n,
      onValueChange: r = () => {
      },
      collapsible: a = !1,
      ...i
    } = e, [s, d] = ae({
      prop: o,
      defaultProp: n ?? "",
      onChange: r,
      caller: Se
    });
    return /* @__PURE__ */ l(
      ai,
      {
        scope: e.__scopeAccordion,
        value: j.useMemo(() => s ? [s] : [], [s]),
        onItemOpen: d,
        onItemClose: j.useCallback(() => a && d(""), [a, d]),
        children: /* @__PURE__ */ l(ii, { scope: e.__scopeAccordion, collapsible: a, children: /* @__PURE__ */ l(si, { ...i, ref: t }) })
      }
    );
  }
), Pf = j.forwardRef((e, t) => {
  const {
    value: o,
    defaultValue: n,
    onValueChange: r = () => {
    },
    ...a
  } = e, [i, s] = ae({
    prop: o,
    defaultProp: n ?? [],
    onChange: r,
    caller: Se
  }), d = j.useCallback(
    (u) => s((p = []) => [...p, u]),
    [s]
  ), f = j.useCallback(
    (u) => s((p = []) => p.filter((m) => m !== u)),
    [s]
  );
  return /* @__PURE__ */ l(
    ai,
    {
      scope: e.__scopeAccordion,
      value: i,
      onItemOpen: d,
      onItemClose: f,
      children: /* @__PURE__ */ l(ii, { scope: e.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ l(si, { ...a, ref: t }) })
    }
  );
}), [_f, No] = Ao(Se), si = j.forwardRef(
  (e, t) => {
    const { __scopeAccordion: o, disabled: n, dir: r, orientation: a = "vertical", ...i } = e, s = j.useRef(null), d = F(s, t), f = yf(o), p = Le(r) === "ltr", m = _(e.onKeyDown, (v) => {
      if (!xf.includes(v.key)) return;
      const h = v.target, g = f().filter((E) => !E.ref.current?.disabled), b = g.findIndex((E) => E.ref.current === h), w = g.length;
      if (b === -1) return;
      v.preventDefault();
      let x = b;
      const y = 0, S = w - 1, R = () => {
        x = b + 1, x > S && (x = y);
      }, T = () => {
        x = b - 1, x < y && (x = S);
      };
      switch (v.key) {
        case "Home":
          x = y;
          break;
        case "End":
          x = S;
          break;
        case "ArrowRight":
          a === "horizontal" && (p ? R() : T());
          break;
        case "ArrowDown":
          a === "vertical" && R();
          break;
        case "ArrowLeft":
          a === "horizontal" && (p ? T() : R());
          break;
        case "ArrowUp":
          a === "vertical" && T();
          break;
      }
      const A = x % w;
      g[A].ref.current?.focus();
    });
    return /* @__PURE__ */ l(
      _f,
      {
        scope: o,
        disabled: n,
        direction: r,
        orientation: a,
        children: /* @__PURE__ */ l(er.Slot, { scope: o, children: /* @__PURE__ */ l(
          k.div,
          {
            ...i,
            "data-orientation": a,
            ref: d,
            onKeyDown: n ? void 0 : m
          }
        ) })
      }
    );
  }
), so = "AccordionItem", [Af, or] = Ao(so), li = j.forwardRef(
  (e, t) => {
    const { __scopeAccordion: o, value: n, ...r } = e, a = No(so, o), i = Sf(so, o), s = tr(o), d = de(), f = n && i.value.includes(n) || !1, u = a.disabled || e.disabled;
    return /* @__PURE__ */ l(
      Af,
      {
        scope: o,
        open: f,
        disabled: u,
        triggerId: d,
        children: /* @__PURE__ */ l(
          ni,
          {
            "data-orientation": a.orientation,
            "data-state": mi(f),
            ...s,
            ...r,
            ref: t,
            disabled: u,
            open: f,
            onOpenChange: (p) => {
              p ? i.onItemOpen(n) : i.onItemClose(n);
            }
          }
        )
      }
    );
  }
);
li.displayName = so;
var ci = "AccordionHeader", di = j.forwardRef(
  (e, t) => {
    const { __scopeAccordion: o, ...n } = e, r = No(Se, o), a = or(ci, o);
    return /* @__PURE__ */ l(
      k.h3,
      {
        "data-orientation": r.orientation,
        "data-state": mi(a.open),
        "data-disabled": a.disabled ? "" : void 0,
        ...n,
        ref: t
      }
    );
  }
);
di.displayName = ci;
var An = "AccordionTrigger", ui = j.forwardRef(
  (e, t) => {
    const { __scopeAccordion: o, ...n } = e, r = No(Se, o), a = or(An, o), i = Rf(An, o), s = tr(o);
    return /* @__PURE__ */ l(er.ItemSlot, { scope: o, children: /* @__PURE__ */ l(
      hf,
      {
        "aria-disabled": a.open && !i.collapsible || void 0,
        "data-orientation": r.orientation,
        id: a.triggerId,
        ...s,
        ...n,
        ref: t
      }
    ) });
  }
);
ui.displayName = An;
var fi = "AccordionContent", pi = j.forwardRef(
  (e, t) => {
    const { __scopeAccordion: o, ...n } = e, r = No(Se, o), a = or(fi, o), i = tr(o);
    return /* @__PURE__ */ l(
      bf,
      {
        role: "region",
        "aria-labelledby": a.triggerId,
        "data-orientation": r.orientation,
        ...i,
        ...n,
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
pi.displayName = fi;
function mi(e) {
  return e ? "open" : "closed";
}
var Nf = ri, Tf = li, kf = di, If = ui, Mf = pi;
function se(e) {
  const t = c.useRef(e);
  return c.useEffect(() => {
    t.current = e;
  }), c.useMemo(() => (...o) => t.current?.(...o), []);
}
function Df(e, t = globalThis?.document) {
  const o = se(e);
  c.useEffect(() => {
    const n = (r) => {
      r.key === "Escape" && o(r);
    };
    return t.addEventListener("keydown", n, { capture: !0 }), () => t.removeEventListener("keydown", n, { capture: !0 });
  }, [o, t]);
}
var Of = "DismissableLayer", Nn = "dismissableLayer.update", Lf = "dismissableLayer.pointerDownOutside", $f = "dismissableLayer.focusOutside", Zr, gi = c.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), nt = c.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: o = !1,
      onEscapeKeyDown: n,
      onPointerDownOutside: r,
      onFocusOutside: a,
      onInteractOutside: i,
      onDismiss: s,
      ...d
    } = e, f = c.useContext(gi), [u, p] = c.useState(null), m = u?.ownerDocument ?? globalThis?.document, [, v] = c.useState({}), h = F(t, (A) => p(A)), g = Array.from(f.layers), [b] = [...f.layersWithOutsidePointerEventsDisabled].slice(-1), w = g.indexOf(b), x = u ? g.indexOf(u) : -1, y = f.layersWithOutsidePointerEventsDisabled.size > 0, S = x >= w, R = Bf((A) => {
      const E = A.target, M = [...f.branches].some(($) => $.contains(E));
      !S || M || (r?.(A), i?.(A), A.defaultPrevented || s?.());
    }, m), T = Vf((A) => {
      const E = A.target;
      [...f.branches].some(($) => $.contains(E)) || (a?.(A), i?.(A), A.defaultPrevented || s?.());
    }, m);
    return Df((A) => {
      x === f.layers.size - 1 && (n?.(A), !A.defaultPrevented && s && (A.preventDefault(), s()));
    }, m), c.useEffect(() => {
      if (u)
        return o && (f.layersWithOutsidePointerEventsDisabled.size === 0 && (Zr = m.body.style.pointerEvents, m.body.style.pointerEvents = "none"), f.layersWithOutsidePointerEventsDisabled.add(u)), f.layers.add(u), Qr(), () => {
          o && f.layersWithOutsidePointerEventsDisabled.size === 1 && (m.body.style.pointerEvents = Zr);
        };
    }, [u, m, o, f]), c.useEffect(() => () => {
      u && (f.layers.delete(u), f.layersWithOutsidePointerEventsDisabled.delete(u), Qr());
    }, [u, f]), c.useEffect(() => {
      const A = () => v({});
      return document.addEventListener(Nn, A), () => document.removeEventListener(Nn, A);
    }, []), /* @__PURE__ */ l(
      k.div,
      {
        ...d,
        ref: h,
        style: {
          pointerEvents: y ? S ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: _(e.onFocusCapture, T.onFocusCapture),
        onBlurCapture: _(e.onBlurCapture, T.onBlurCapture),
        onPointerDownCapture: _(
          e.onPointerDownCapture,
          R.onPointerDownCapture
        )
      }
    );
  }
);
nt.displayName = Of;
var zf = "DismissableLayerBranch", Ff = c.forwardRef((e, t) => {
  const o = c.useContext(gi), n = c.useRef(null), r = F(t, n);
  return c.useEffect(() => {
    const a = n.current;
    if (a)
      return o.branches.add(a), () => {
        o.branches.delete(a);
      };
  }, [o.branches]), /* @__PURE__ */ l(k.div, { ...e, ref: r });
});
Ff.displayName = zf;
function Bf(e, t = globalThis?.document) {
  const o = se(e), n = c.useRef(!1), r = c.useRef(() => {
  });
  return c.useEffect(() => {
    const a = (s) => {
      if (s.target && !n.current) {
        let d = function() {
          vi(
            Lf,
            o,
            f,
            { discrete: !0 }
          );
        };
        const f = { originalEvent: s };
        s.pointerType === "touch" ? (t.removeEventListener("click", r.current), r.current = d, t.addEventListener("click", r.current, { once: !0 })) : d();
      } else
        t.removeEventListener("click", r.current);
      n.current = !1;
    }, i = window.setTimeout(() => {
      t.addEventListener("pointerdown", a);
    }, 0);
    return () => {
      window.clearTimeout(i), t.removeEventListener("pointerdown", a), t.removeEventListener("click", r.current);
    };
  }, [t, o]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => n.current = !0
  };
}
function Vf(e, t = globalThis?.document) {
  const o = se(e), n = c.useRef(!1);
  return c.useEffect(() => {
    const r = (a) => {
      a.target && !n.current && vi($f, o, { originalEvent: a }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", r), () => t.removeEventListener("focusin", r);
  }, [t, o]), {
    onFocusCapture: () => n.current = !0,
    onBlurCapture: () => n.current = !1
  };
}
function Qr() {
  const e = new CustomEvent(Nn);
  document.dispatchEvent(e);
}
function vi(e, t, o, { discrete: n }) {
  const r = o.originalEvent.target, a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: o });
  t && r.addEventListener(e, t, { once: !0 }), n ? Za(r, a) : r.dispatchEvent(a);
}
var un = "focusScope.autoFocusOnMount", fn = "focusScope.autoFocusOnUnmount", Jr = { bubbles: !1, cancelable: !0 }, Gf = "FocusScope", Lt = c.forwardRef((e, t) => {
  const {
    loop: o = !1,
    trapped: n = !1,
    onMountAutoFocus: r,
    onUnmountAutoFocus: a,
    ...i
  } = e, [s, d] = c.useState(null), f = se(r), u = se(a), p = c.useRef(null), m = F(t, (g) => d(g)), v = c.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  c.useEffect(() => {
    if (n) {
      let g = function(y) {
        if (v.paused || !s) return;
        const S = y.target;
        s.contains(S) ? p.current = S : Fe(p.current, { select: !0 });
      }, b = function(y) {
        if (v.paused || !s) return;
        const S = y.relatedTarget;
        S !== null && (s.contains(S) || Fe(p.current, { select: !0 }));
      }, w = function(y) {
        if (document.activeElement === document.body)
          for (const R of y)
            R.removedNodes.length > 0 && Fe(s);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", b);
      const x = new MutationObserver(w);
      return s && x.observe(s, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", b), x.disconnect();
      };
    }
  }, [n, s, v.paused]), c.useEffect(() => {
    if (s) {
      ta.add(v);
      const g = document.activeElement;
      if (!s.contains(g)) {
        const w = new CustomEvent(un, Jr);
        s.addEventListener(un, f), s.dispatchEvent(w), w.defaultPrevented || (Hf(Yf(hi(s)), { select: !0 }), document.activeElement === g && Fe(s));
      }
      return () => {
        s.removeEventListener(un, f), setTimeout(() => {
          const w = new CustomEvent(fn, Jr);
          s.addEventListener(fn, u), s.dispatchEvent(w), w.defaultPrevented || Fe(g ?? document.body, { select: !0 }), s.removeEventListener(fn, u), ta.remove(v);
        }, 0);
      };
    }
  }, [s, f, u, v]);
  const h = c.useCallback(
    (g) => {
      if (!o && !n || v.paused) return;
      const b = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, w = document.activeElement;
      if (b && w) {
        const x = g.currentTarget, [y, S] = Wf(x);
        y && S ? !g.shiftKey && w === S ? (g.preventDefault(), o && Fe(y, { select: !0 })) : g.shiftKey && w === y && (g.preventDefault(), o && Fe(S, { select: !0 })) : w === x && g.preventDefault();
      }
    },
    [o, n, v.paused]
  );
  return /* @__PURE__ */ l(k.div, { tabIndex: -1, ...i, ref: m, onKeyDown: h });
});
Lt.displayName = Gf;
function Hf(e, { select: t = !1 } = {}) {
  const o = document.activeElement;
  for (const n of e)
    if (Fe(n, { select: t }), document.activeElement !== o) return;
}
function Wf(e) {
  const t = hi(e), o = ea(t, e), n = ea(t.reverse(), e);
  return [o, n];
}
function hi(e) {
  const t = [], o = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => {
      const r = n.tagName === "INPUT" && n.type === "hidden";
      return n.disabled || n.hidden || r ? NodeFilter.FILTER_SKIP : n.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; o.nextNode(); ) t.push(o.currentNode);
  return t;
}
function ea(e, t) {
  for (const o of e)
    if (!Uf(o, { upTo: t })) return o;
}
function Uf(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function Kf(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Fe(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const o = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== o && Kf(e) && t && e.select();
  }
}
var ta = jf();
function jf() {
  let e = [];
  return {
    add(t) {
      const o = e[0];
      t !== o && o?.pause(), e = oa(e, t), e.unshift(t);
    },
    remove(t) {
      e = oa(e, t), e[0]?.resume();
    }
  };
}
function oa(e, t) {
  const o = [...e], n = o.indexOf(t);
  return n !== -1 && o.splice(n, 1), o;
}
function Yf(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Xf = "Portal", rt = c.forwardRef((e, t) => {
  const { container: o, ...n } = e, [r, a] = c.useState(!1);
  ne(() => a(!0), []);
  const i = o || r && globalThis?.document?.body;
  return i ? eu.createPortal(/* @__PURE__ */ l(k.div, { ...n, ref: t }), i) : null;
});
rt.displayName = Xf;
var pn = 0;
function To() {
  c.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? na()), document.body.insertAdjacentElement("beforeend", e[1] ?? na()), pn++, () => {
      pn === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), pn--;
    };
  }, []);
}
function na() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var Ee = function() {
  return Ee = Object.assign || function(t) {
    for (var o, n = 1, r = arguments.length; n < r; n++) {
      o = arguments[n];
      for (var a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
    }
    return t;
  }, Ee.apply(this, arguments);
};
function bi(e, t) {
  var o = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (o[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var r = 0, n = Object.getOwnPropertySymbols(e); r < n.length; r++)
      t.indexOf(n[r]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[r]) && (o[n[r]] = e[n[r]]);
  return o;
}
function qf(e, t, o) {
  if (o || arguments.length === 2) for (var n = 0, r = t.length, a; n < r; n++)
    (a || !(n in t)) && (a || (a = Array.prototype.slice.call(t, 0, n)), a[n] = t[n]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var ro = "right-scroll-bar-position", ao = "width-before-scroll-bar", Zf = "with-scroll-bars-hidden", Qf = "--removed-body-scroll-bar-size";
function mn(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Jf(e, t) {
  var o = Zd(function() {
    return {
      // value
      value: e,
      // last callback
      callback: t,
      // "memoized" public interface
      facade: {
        get current() {
          return o.value;
        },
        set current(n) {
          var r = o.value;
          r !== n && (o.value = n, o.callback(n, r));
        }
      }
    };
  })[0];
  return o.callback = t, o.facade;
}
var ep = typeof window < "u" ? c.useLayoutEffect : c.useEffect, ra = /* @__PURE__ */ new WeakMap();
function tp(e, t) {
  var o = Jf(null, function(n) {
    return e.forEach(function(r) {
      return mn(r, n);
    });
  });
  return ep(function() {
    var n = ra.get(o);
    if (n) {
      var r = new Set(n), a = new Set(e), i = o.current;
      r.forEach(function(s) {
        a.has(s) || mn(s, null);
      }), a.forEach(function(s) {
        r.has(s) || mn(s, i);
      });
    }
    ra.set(o, e);
  }, [e]), o;
}
function op(e) {
  return e;
}
function np(e, t) {
  t === void 0 && (t = op);
  var o = [], n = !1, r = {
    read: function() {
      if (n)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return o.length ? o[o.length - 1] : e;
    },
    useMedium: function(a) {
      var i = t(a, n);
      return o.push(i), function() {
        o = o.filter(function(s) {
          return s !== i;
        });
      };
    },
    assignSyncMedium: function(a) {
      for (n = !0; o.length; ) {
        var i = o;
        o = [], i.forEach(a);
      }
      o = {
        push: function(s) {
          return a(s);
        },
        filter: function() {
          return o;
        }
      };
    },
    assignMedium: function(a) {
      n = !0;
      var i = [];
      if (o.length) {
        var s = o;
        o = [], s.forEach(a), i = o;
      }
      var d = function() {
        var u = i;
        i = [], u.forEach(a);
      }, f = function() {
        return Promise.resolve().then(d);
      };
      f(), o = {
        push: function(u) {
          i.push(u), f();
        },
        filter: function(u) {
          return i = i.filter(u), o;
        }
      };
    }
  };
  return r;
}
function rp(e) {
  e === void 0 && (e = {});
  var t = np(null);
  return t.options = Ee({ async: !0, ssr: !1 }, e), t;
}
var wi = function(e) {
  var t = e.sideCar, o = bi(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var n = t.read();
  if (!n)
    throw new Error("Sidecar medium not found");
  return c.createElement(n, Ee({}, o));
};
wi.isSideCarExport = !0;
function ap(e, t) {
  return e.useMedium(t), wi;
}
var xi = rp(), gn = function() {
}, ko = c.forwardRef(function(e, t) {
  var o = c.useRef(null), n = c.useState({
    onScrollCapture: gn,
    onWheelCapture: gn,
    onTouchMoveCapture: gn
  }), r = n[0], a = n[1], i = e.forwardProps, s = e.children, d = e.className, f = e.removeScrollBar, u = e.enabled, p = e.shards, m = e.sideCar, v = e.noRelative, h = e.noIsolation, g = e.inert, b = e.allowPinchZoom, w = e.as, x = w === void 0 ? "div" : w, y = e.gapMode, S = bi(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), R = m, T = tp([o, t]), A = Ee(Ee({}, S), r);
  return c.createElement(
    c.Fragment,
    null,
    u && c.createElement(R, { sideCar: xi, removeScrollBar: f, shards: p, noRelative: v, noIsolation: h, inert: g, setCallbacks: a, allowPinchZoom: !!b, lockRef: o, gapMode: y }),
    i ? c.cloneElement(c.Children.only(s), Ee(Ee({}, A), { ref: T })) : c.createElement(x, Ee({}, A, { className: d, ref: T }), s)
  );
});
ko.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
ko.classNames = {
  fullWidth: ao,
  zeroRight: ro
};
var ip = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function sp() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = ip();
  return t && e.setAttribute("nonce", t), e;
}
function lp(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function cp(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var dp = function() {
  var e = 0, t = null;
  return {
    add: function(o) {
      e == 0 && (t = sp()) && (lp(t, o), cp(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, up = function() {
  var e = dp();
  return function(t, o) {
    c.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && o]);
  };
}, yi = function() {
  var e = up(), t = function(o) {
    var n = o.styles, r = o.dynamic;
    return e(n, r), null;
  };
  return t;
}, fp = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, vn = function(e) {
  return parseInt(e || "", 10) || 0;
}, pp = function(e) {
  var t = window.getComputedStyle(document.body), o = t[e === "padding" ? "paddingLeft" : "marginLeft"], n = t[e === "padding" ? "paddingTop" : "marginTop"], r = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [vn(o), vn(n), vn(r)];
}, mp = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return fp;
  var t = pp(e), o = document.documentElement.clientWidth, n = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, n - o + t[2] - t[0])
  };
}, gp = yi(), ut = "data-scroll-locked", vp = function(e, t, o, n) {
  var r = e.left, a = e.top, i = e.right, s = e.gap;
  return o === void 0 && (o = "margin"), `
  .`.concat(Zf, ` {
   overflow: hidden `).concat(n, `;
   padding-right: `).concat(s, "px ").concat(n, `;
  }
  body[`).concat(ut, `] {
    overflow: hidden `).concat(n, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(n, ";"),
    o === "margin" && `
    padding-left: `.concat(r, `px;
    padding-top: `).concat(a, `px;
    padding-right: `).concat(i, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(s, "px ").concat(n, `;
    `),
    o === "padding" && "padding-right: ".concat(s, "px ").concat(n, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(ro, ` {
    right: `).concat(s, "px ").concat(n, `;
  }
  
  .`).concat(ao, ` {
    margin-right: `).concat(s, "px ").concat(n, `;
  }
  
  .`).concat(ro, " .").concat(ro, ` {
    right: 0 `).concat(n, `;
  }
  
  .`).concat(ao, " .").concat(ao, ` {
    margin-right: 0 `).concat(n, `;
  }
  
  body[`).concat(ut, `] {
    `).concat(Qf, ": ").concat(s, `px;
  }
`);
}, aa = function() {
  var e = parseInt(document.body.getAttribute(ut) || "0", 10);
  return isFinite(e) ? e : 0;
}, hp = function() {
  c.useEffect(function() {
    return document.body.setAttribute(ut, (aa() + 1).toString()), function() {
      var e = aa() - 1;
      e <= 0 ? document.body.removeAttribute(ut) : document.body.setAttribute(ut, e.toString());
    };
  }, []);
}, bp = function(e) {
  var t = e.noRelative, o = e.noImportant, n = e.gapMode, r = n === void 0 ? "margin" : n;
  hp();
  var a = c.useMemo(function() {
    return mp(r);
  }, [r]);
  return c.createElement(gp, { styles: vp(a, !t, r, o ? "" : "!important") });
}, Tn = !1;
if (typeof window < "u")
  try {
    var Qt = Object.defineProperty({}, "passive", {
      get: function() {
        return Tn = !0, !0;
      }
    });
    window.addEventListener("test", Qt, Qt), window.removeEventListener("test", Qt, Qt);
  } catch {
    Tn = !1;
  }
var lt = Tn ? { passive: !1 } : !1, wp = function(e) {
  return e.tagName === "TEXTAREA";
}, Ci = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var o = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    o[t] !== "hidden" && // contains scroll inside self
    !(o.overflowY === o.overflowX && !wp(e) && o[t] === "visible")
  );
}, xp = function(e) {
  return Ci(e, "overflowY");
}, yp = function(e) {
  return Ci(e, "overflowX");
}, ia = function(e, t) {
  var o = t.ownerDocument, n = t;
  do {
    typeof ShadowRoot < "u" && n instanceof ShadowRoot && (n = n.host);
    var r = Si(e, n);
    if (r) {
      var a = Ri(e, n), i = a[1], s = a[2];
      if (i > s)
        return !0;
    }
    n = n.parentNode;
  } while (n && n !== o.body);
  return !1;
}, Cp = function(e) {
  var t = e.scrollTop, o = e.scrollHeight, n = e.clientHeight;
  return [
    t,
    o,
    n
  ];
}, Sp = function(e) {
  var t = e.scrollLeft, o = e.scrollWidth, n = e.clientWidth;
  return [
    t,
    o,
    n
  ];
}, Si = function(e, t) {
  return e === "v" ? xp(t) : yp(t);
}, Ri = function(e, t) {
  return e === "v" ? Cp(t) : Sp(t);
}, Rp = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, Ep = function(e, t, o, n, r) {
  var a = Rp(e, window.getComputedStyle(t).direction), i = a * n, s = o.target, d = t.contains(s), f = !1, u = i > 0, p = 0, m = 0;
  do {
    if (!s)
      break;
    var v = Ri(e, s), h = v[0], g = v[1], b = v[2], w = g - b - a * h;
    (h || w) && Si(e, s) && (p += w, m += h);
    var x = s.parentNode;
    s = x && x.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? x.host : x;
  } while (
    // portaled content
    !d && s !== document.body || // self content
    d && (t.contains(s) || t === s)
  );
  return (u && Math.abs(p) < 1 || !u && Math.abs(m) < 1) && (f = !0), f;
}, Jt = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, sa = function(e) {
  return [e.deltaX, e.deltaY];
}, la = function(e) {
  return e && "current" in e ? e.current : e;
}, Pp = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, _p = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Ap = 0, ct = [];
function Np(e) {
  var t = c.useRef([]), o = c.useRef([0, 0]), n = c.useRef(), r = c.useState(Ap++)[0], a = c.useState(yi)[0], i = c.useRef(e);
  c.useEffect(function() {
    i.current = e;
  }, [e]), c.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(r));
      var g = qf([e.lockRef.current], (e.shards || []).map(la), !0).filter(Boolean);
      return g.forEach(function(b) {
        return b.classList.add("allow-interactivity-".concat(r));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(r)), g.forEach(function(b) {
          return b.classList.remove("allow-interactivity-".concat(r));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var s = c.useCallback(function(g, b) {
    if ("touches" in g && g.touches.length === 2 || g.type === "wheel" && g.ctrlKey)
      return !i.current.allowPinchZoom;
    var w = Jt(g), x = o.current, y = "deltaX" in g ? g.deltaX : x[0] - w[0], S = "deltaY" in g ? g.deltaY : x[1] - w[1], R, T = g.target, A = Math.abs(y) > Math.abs(S) ? "h" : "v";
    if ("touches" in g && A === "h" && T.type === "range")
      return !1;
    var E = ia(A, T);
    if (!E)
      return !0;
    if (E ? R = A : (R = A === "v" ? "h" : "v", E = ia(A, T)), !E)
      return !1;
    if (!n.current && "changedTouches" in g && (y || S) && (n.current = R), !R)
      return !0;
    var M = n.current || R;
    return Ep(M, b, g, M === "h" ? y : S);
  }, []), d = c.useCallback(function(g) {
    var b = g;
    if (!(!ct.length || ct[ct.length - 1] !== a)) {
      var w = "deltaY" in b ? sa(b) : Jt(b), x = t.current.filter(function(R) {
        return R.name === b.type && (R.target === b.target || b.target === R.shadowParent) && Pp(R.delta, w);
      })[0];
      if (x && x.should) {
        b.cancelable && b.preventDefault();
        return;
      }
      if (!x) {
        var y = (i.current.shards || []).map(la).filter(Boolean).filter(function(R) {
          return R.contains(b.target);
        }), S = y.length > 0 ? s(b, y[0]) : !i.current.noIsolation;
        S && b.cancelable && b.preventDefault();
      }
    }
  }, []), f = c.useCallback(function(g, b, w, x) {
    var y = { name: g, delta: b, target: w, should: x, shadowParent: Tp(w) };
    t.current.push(y), setTimeout(function() {
      t.current = t.current.filter(function(S) {
        return S !== y;
      });
    }, 1);
  }, []), u = c.useCallback(function(g) {
    o.current = Jt(g), n.current = void 0;
  }, []), p = c.useCallback(function(g) {
    f(g.type, sa(g), g.target, s(g, e.lockRef.current));
  }, []), m = c.useCallback(function(g) {
    f(g.type, Jt(g), g.target, s(g, e.lockRef.current));
  }, []);
  c.useEffect(function() {
    return ct.push(a), e.setCallbacks({
      onScrollCapture: p,
      onWheelCapture: p,
      onTouchMoveCapture: m
    }), document.addEventListener("wheel", d, lt), document.addEventListener("touchmove", d, lt), document.addEventListener("touchstart", u, lt), function() {
      ct = ct.filter(function(g) {
        return g !== a;
      }), document.removeEventListener("wheel", d, lt), document.removeEventListener("touchmove", d, lt), document.removeEventListener("touchstart", u, lt);
    };
  }, []);
  var v = e.removeScrollBar, h = e.inert;
  return c.createElement(
    c.Fragment,
    null,
    h ? c.createElement(a, { styles: _p(r) }) : null,
    v ? c.createElement(bp, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function Tp(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const kp = ap(xi, Np);
var $t = c.forwardRef(function(e, t) {
  return c.createElement(ko, Ee({}, e, { ref: t, sideCar: kp }));
});
$t.classNames = ko.classNames;
var Ip = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, dt = /* @__PURE__ */ new WeakMap(), eo = /* @__PURE__ */ new WeakMap(), to = {}, hn = 0, Ei = function(e) {
  return e && (e.host || Ei(e.parentNode));
}, Mp = function(e, t) {
  return t.map(function(o) {
    if (e.contains(o))
      return o;
    var n = Ei(o);
    return n && e.contains(n) ? n : (console.error("aria-hidden", o, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(o) {
    return !!o;
  });
}, Dp = function(e, t, o, n) {
  var r = Mp(t, Array.isArray(e) ? e : [e]);
  to[o] || (to[o] = /* @__PURE__ */ new WeakMap());
  var a = to[o], i = [], s = /* @__PURE__ */ new Set(), d = new Set(r), f = function(p) {
    !p || s.has(p) || (s.add(p), f(p.parentNode));
  };
  r.forEach(f);
  var u = function(p) {
    !p || d.has(p) || Array.prototype.forEach.call(p.children, function(m) {
      if (s.has(m))
        u(m);
      else
        try {
          var v = m.getAttribute(n), h = v !== null && v !== "false", g = (dt.get(m) || 0) + 1, b = (a.get(m) || 0) + 1;
          dt.set(m, g), a.set(m, b), i.push(m), g === 1 && h && eo.set(m, !0), b === 1 && m.setAttribute(o, "true"), h || m.setAttribute(n, "true");
        } catch (w) {
          console.error("aria-hidden: cannot operate on ", m, w);
        }
    });
  };
  return u(t), s.clear(), hn++, function() {
    i.forEach(function(p) {
      var m = dt.get(p) - 1, v = a.get(p) - 1;
      dt.set(p, m), a.set(p, v), m || (eo.has(p) || p.removeAttribute(n), eo.delete(p)), v || p.removeAttribute(o);
    }), hn--, hn || (dt = /* @__PURE__ */ new WeakMap(), dt = /* @__PURE__ */ new WeakMap(), eo = /* @__PURE__ */ new WeakMap(), to = {});
  };
}, Io = function(e, t, o) {
  o === void 0 && (o = "data-aria-hidden");
  var n = Array.from(Array.isArray(e) ? e : [e]), r = Ip(e);
  return r ? (n.push.apply(n, Array.from(r.querySelectorAll("[aria-live], script"))), Dp(n, r, o, "aria-hidden")) : function() {
    return null;
  };
}, Mo = "Dialog", [Pi, _i] = te(Mo), [Op, Re] = Pi(Mo), Ai = (e) => {
  const {
    __scopeDialog: t,
    children: o,
    open: n,
    defaultOpen: r,
    onOpenChange: a,
    modal: i = !0
  } = e, s = c.useRef(null), d = c.useRef(null), [f, u] = ae({
    prop: n,
    defaultProp: r ?? !1,
    onChange: a,
    caller: Mo
  });
  return /* @__PURE__ */ l(
    Op,
    {
      scope: t,
      triggerRef: s,
      contentRef: d,
      contentId: de(),
      titleId: de(),
      descriptionId: de(),
      open: f,
      onOpenChange: u,
      onOpenToggle: c.useCallback(() => u((p) => !p), [u]),
      modal: i,
      children: o
    }
  );
};
Ai.displayName = Mo;
var Ni = "DialogTrigger", Ti = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: o, ...n } = e, r = Re(Ni, o), a = F(t, r.triggerRef);
    return /* @__PURE__ */ l(
      k.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": r.open,
        "aria-controls": r.contentId,
        "data-state": ar(r.open),
        ...n,
        ref: a,
        onClick: _(e.onClick, r.onOpenToggle)
      }
    );
  }
);
Ti.displayName = Ni;
var nr = "DialogPortal", [Lp, ki] = Pi(nr, {
  forceMount: void 0
}), Ii = (e) => {
  const { __scopeDialog: t, forceMount: o, children: n, container: r } = e, a = Re(nr, t);
  return /* @__PURE__ */ l(Lp, { scope: t, forceMount: o, children: c.Children.map(n, (i) => /* @__PURE__ */ l(oe, { present: o || a.open, children: /* @__PURE__ */ l(rt, { asChild: !0, container: r, children: i }) })) });
};
Ii.displayName = nr;
var lo = "DialogOverlay", Mi = c.forwardRef(
  (e, t) => {
    const o = ki(lo, e.__scopeDialog), { forceMount: n = o.forceMount, ...r } = e, a = Re(lo, e.__scopeDialog);
    return a.modal ? /* @__PURE__ */ l(oe, { present: n || a.open, children: /* @__PURE__ */ l(zp, { ...r, ref: t }) }) : null;
  }
);
Mi.displayName = lo;
var $p = /* @__PURE__ */ Ge("DialogOverlay.RemoveScroll"), zp = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: o, ...n } = e, r = Re(lo, o);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ l($t, { as: $p, allowPinchZoom: !0, shards: [r.contentRef], children: /* @__PURE__ */ l(
        k.div,
        {
          "data-state": ar(r.open),
          ...n,
          ref: t,
          style: { pointerEvents: "auto", ...n.style }
        }
      ) })
    );
  }
), Je = "DialogContent", Di = c.forwardRef(
  (e, t) => {
    const o = ki(Je, e.__scopeDialog), { forceMount: n = o.forceMount, ...r } = e, a = Re(Je, e.__scopeDialog);
    return /* @__PURE__ */ l(oe, { present: n || a.open, children: a.modal ? /* @__PURE__ */ l(Fp, { ...r, ref: t }) : /* @__PURE__ */ l(Bp, { ...r, ref: t }) });
  }
);
Di.displayName = Je;
var Fp = c.forwardRef(
  (e, t) => {
    const o = Re(Je, e.__scopeDialog), n = c.useRef(null), r = F(t, o.contentRef, n);
    return c.useEffect(() => {
      const a = n.current;
      if (a) return Io(a);
    }, []), /* @__PURE__ */ l(
      Oi,
      {
        ...e,
        ref: r,
        trapFocus: o.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: _(e.onCloseAutoFocus, (a) => {
          a.preventDefault(), o.triggerRef.current?.focus();
        }),
        onPointerDownOutside: _(e.onPointerDownOutside, (a) => {
          const i = a.detail.originalEvent, s = i.button === 0 && i.ctrlKey === !0;
          (i.button === 2 || s) && a.preventDefault();
        }),
        onFocusOutside: _(
          e.onFocusOutside,
          (a) => a.preventDefault()
        )
      }
    );
  }
), Bp = c.forwardRef(
  (e, t) => {
    const o = Re(Je, e.__scopeDialog), n = c.useRef(!1), r = c.useRef(!1);
    return /* @__PURE__ */ l(
      Oi,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (a) => {
          e.onCloseAutoFocus?.(a), a.defaultPrevented || (n.current || o.triggerRef.current?.focus(), a.preventDefault()), n.current = !1, r.current = !1;
        },
        onInteractOutside: (a) => {
          e.onInteractOutside?.(a), a.defaultPrevented || (n.current = !0, a.detail.originalEvent.type === "pointerdown" && (r.current = !0));
          const i = a.target;
          o.triggerRef.current?.contains(i) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && r.current && a.preventDefault();
        }
      }
    );
  }
), Oi = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: o, trapFocus: n, onOpenAutoFocus: r, onCloseAutoFocus: a, ...i } = e, s = Re(Je, o), d = c.useRef(null), f = F(t, d);
    return To(), /* @__PURE__ */ K(Ve, { children: [
      /* @__PURE__ */ l(
        Lt,
        {
          asChild: !0,
          loop: !0,
          trapped: n,
          onMountAutoFocus: r,
          onUnmountAutoFocus: a,
          children: /* @__PURE__ */ l(
            nt,
            {
              role: "dialog",
              id: s.contentId,
              "aria-describedby": s.descriptionId,
              "aria-labelledby": s.titleId,
              "data-state": ar(s.open),
              ...i,
              ref: f,
              onDismiss: () => s.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ K(Ve, { children: [
        /* @__PURE__ */ l(Gp, { titleId: s.titleId }),
        /* @__PURE__ */ l(Wp, { contentRef: d, descriptionId: s.descriptionId })
      ] })
    ] });
  }
), rr = "DialogTitle", Li = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: o, ...n } = e, r = Re(rr, o);
    return /* @__PURE__ */ l(k.h2, { id: r.titleId, ...n, ref: t });
  }
);
Li.displayName = rr;
var $i = "DialogDescription", zi = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: o, ...n } = e, r = Re($i, o);
    return /* @__PURE__ */ l(k.p, { id: r.descriptionId, ...n, ref: t });
  }
);
zi.displayName = $i;
var Fi = "DialogClose", Bi = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: o, ...n } = e, r = Re(Fi, o);
    return /* @__PURE__ */ l(
      k.button,
      {
        type: "button",
        ...n,
        ref: t,
        onClick: _(e.onClick, () => r.onOpenChange(!1))
      }
    );
  }
);
Bi.displayName = Fi;
function ar(e) {
  return e ? "open" : "closed";
}
var Vi = "DialogTitleWarning", [Vp, Gi] = nf(Vi, {
  contentName: Je,
  titleName: rr,
  docsSlug: "dialog"
}), Gp = ({ titleId: e }) => {
  const t = Gi(Vi), o = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return c.useEffect(() => {
    e && (document.getElementById(e) || console.error(o));
  }, [o, e]), null;
}, Hp = "DialogDescriptionWarning", Wp = ({ contentRef: e, descriptionId: t }) => {
  const n = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Gi(Hp).contentName}}.`;
  return c.useEffect(() => {
    const r = e.current?.getAttribute("aria-describedby");
    t && r && (document.getElementById(t) || console.warn(n));
  }, [n, e, t]), null;
}, ir = Ai, sr = Ti, lr = Ii, cr = Mi, dr = Di, ur = Li, fr = zi, at = Bi, Hi = "AlertDialog", [Up, Gx] = te(Hi, [
  _i
]), $e = _i(), Wi = (e) => {
  const { __scopeAlertDialog: t, ...o } = e, n = $e(t);
  return /* @__PURE__ */ l(ir, { ...n, ...o, modal: !0 });
};
Wi.displayName = Hi;
var Kp = "AlertDialogTrigger", Ui = c.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: o, ...n } = e, r = $e(o);
    return /* @__PURE__ */ l(sr, { ...r, ...n, ref: t });
  }
);
Ui.displayName = Kp;
var jp = "AlertDialogPortal", Ki = (e) => {
  const { __scopeAlertDialog: t, ...o } = e, n = $e(t);
  return /* @__PURE__ */ l(lr, { ...n, ...o });
};
Ki.displayName = jp;
var Yp = "AlertDialogOverlay", ji = c.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: o, ...n } = e, r = $e(o);
    return /* @__PURE__ */ l(cr, { ...r, ...n, ref: t });
  }
);
ji.displayName = Yp;
var ft = "AlertDialogContent", [Xp, qp] = Up(ft), Zp = /* @__PURE__ */ qa("AlertDialogContent"), Yi = c.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: o, children: n, ...r } = e, a = $e(o), i = c.useRef(null), s = F(t, i), d = c.useRef(null);
    return /* @__PURE__ */ l(
      Vp,
      {
        contentName: ft,
        titleName: Xi,
        docsSlug: "alert-dialog",
        children: /* @__PURE__ */ l(Xp, { scope: o, cancelRef: d, children: /* @__PURE__ */ K(
          dr,
          {
            role: "alertdialog",
            ...a,
            ...r,
            ref: s,
            onOpenAutoFocus: _(r.onOpenAutoFocus, (f) => {
              f.preventDefault(), d.current?.focus({ preventScroll: !0 });
            }),
            onPointerDownOutside: (f) => f.preventDefault(),
            onInteractOutside: (f) => f.preventDefault(),
            children: [
              /* @__PURE__ */ l(Zp, { children: n }),
              /* @__PURE__ */ l(Jp, { contentRef: i })
            ]
          }
        ) })
      }
    );
  }
);
Yi.displayName = ft;
var Xi = "AlertDialogTitle", qi = c.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: o, ...n } = e, r = $e(o);
    return /* @__PURE__ */ l(ur, { ...r, ...n, ref: t });
  }
);
qi.displayName = Xi;
var Zi = "AlertDialogDescription", Qi = c.forwardRef((e, t) => {
  const { __scopeAlertDialog: o, ...n } = e, r = $e(o);
  return /* @__PURE__ */ l(fr, { ...r, ...n, ref: t });
});
Qi.displayName = Zi;
var Qp = "AlertDialogAction", Ji = c.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: o, ...n } = e, r = $e(o);
    return /* @__PURE__ */ l(at, { ...r, ...n, ref: t });
  }
);
Ji.displayName = Qp;
var es = "AlertDialogCancel", ts = c.forwardRef(
  (e, t) => {
    const { __scopeAlertDialog: o, ...n } = e, { cancelRef: r } = qp(es, o), a = $e(o), i = F(t, r);
    return /* @__PURE__ */ l(at, { ...a, ...n, ref: i });
  }
);
ts.displayName = es;
var Jp = ({ contentRef: e }) => {
  const t = `\`${ft}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${ft}\` by passing a \`${Zi}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${ft}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
  return c.useEffect(() => {
    document.getElementById(
      e.current?.getAttribute("aria-describedby")
    ) || console.warn(t);
  }, [t, e]), null;
}, em = Wi, tm = Ui, om = Ki, nm = ji, rm = Yi, am = Ji, im = ts, sm = qi, lm = Qi, cm = "AspectRatio", os = c.forwardRef(
  (e, t) => {
    const { ratio: o = 1 / 1, style: n, ...r } = e;
    return /* @__PURE__ */ l(
      "div",
      {
        style: {
          // ensures inner element is contained
          position: "relative",
          // ensures padding bottom trick maths works
          width: "100%",
          paddingBottom: `${100 / o}%`
        },
        "data-radix-aspect-ratio-wrapper": "",
        children: /* @__PURE__ */ l(
          k.div,
          {
            ...r,
            ref: t,
            style: {
              ...n,
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
os.displayName = cm;
var dm = os, oo = { exports: {} }, bn = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ca;
function um() {
  if (ca) return bn;
  ca = 1;
  var e = j;
  function t(p, m) {
    return p === m && (p !== 0 || 1 / p === 1 / m) || p !== p && m !== m;
  }
  var o = typeof Object.is == "function" ? Object.is : t, n = e.useState, r = e.useEffect, a = e.useLayoutEffect, i = e.useDebugValue;
  function s(p, m) {
    var v = m(), h = n({ inst: { value: v, getSnapshot: m } }), g = h[0].inst, b = h[1];
    return a(
      function() {
        g.value = v, g.getSnapshot = m, d(g) && b({ inst: g });
      },
      [p, v, m]
    ), r(
      function() {
        return d(g) && b({ inst: g }), p(function() {
          d(g) && b({ inst: g });
        });
      },
      [p]
    ), i(v), v;
  }
  function d(p) {
    var m = p.getSnapshot;
    p = p.value;
    try {
      var v = m();
      return !o(p, v);
    } catch {
      return !0;
    }
  }
  function f(p, m) {
    return m();
  }
  var u = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? f : s;
  return bn.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : u, bn;
}
var wn = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var da;
function fm() {
  return da || (da = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(v, h) {
      return v === h && (v !== 0 || 1 / v === 1 / h) || v !== v && h !== h;
    }
    function t(v, h) {
      u || r.startTransition === void 0 || (u = !0, console.error(
        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
      ));
      var g = h();
      if (!p) {
        var b = h();
        a(g, b) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), p = !0);
      }
      b = i({
        inst: { value: g, getSnapshot: h }
      });
      var w = b[0].inst, x = b[1];
      return d(
        function() {
          w.value = g, w.getSnapshot = h, o(w) && x({ inst: w });
        },
        [v, g, h]
      ), s(
        function() {
          return o(w) && x({ inst: w }), v(function() {
            o(w) && x({ inst: w });
          });
        },
        [v]
      ), f(g), g;
    }
    function o(v) {
      var h = v.getSnapshot;
      v = v.value;
      try {
        var g = h();
        return !a(v, g);
      } catch {
        return !0;
      }
    }
    function n(v, h) {
      return h();
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var r = j, a = typeof Object.is == "function" ? Object.is : e, i = r.useState, s = r.useEffect, d = r.useLayoutEffect, f = r.useDebugValue, u = !1, p = !1, m = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? n : t;
    wn.useSyncExternalStore = r.useSyncExternalStore !== void 0 ? r.useSyncExternalStore : m, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), wn;
}
var ua;
function pm() {
  return ua || (ua = 1, process.env.NODE_ENV === "production" ? oo.exports = um() : oo.exports = fm()), oo.exports;
}
var mm = pm();
function gm() {
  return mm.useSyncExternalStore(
    vm,
    () => !0,
    () => !1
  );
}
function vm() {
  return () => {
  };
}
var pr = "Avatar", [hm, Hx] = te(pr), [bm, ns] = hm(pr), rs = c.forwardRef(
  (e, t) => {
    const { __scopeAvatar: o, ...n } = e, [r, a] = c.useState("idle");
    return /* @__PURE__ */ l(
      bm,
      {
        scope: o,
        imageLoadingStatus: r,
        onImageLoadingStatusChange: a,
        children: /* @__PURE__ */ l(k.span, { ...n, ref: t })
      }
    );
  }
);
rs.displayName = pr;
var as = "AvatarImage", is = c.forwardRef(
  (e, t) => {
    const { __scopeAvatar: o, src: n, onLoadingStatusChange: r = () => {
    }, ...a } = e, i = ns(as, o), s = wm(n, a), d = se((f) => {
      r(f), i.onImageLoadingStatusChange(f);
    });
    return ne(() => {
      s !== "idle" && d(s);
    }, [s, d]), s === "loaded" ? /* @__PURE__ */ l(k.img, { ...a, ref: t, src: n }) : null;
  }
);
is.displayName = as;
var ss = "AvatarFallback", ls = c.forwardRef(
  (e, t) => {
    const { __scopeAvatar: o, delayMs: n, ...r } = e, a = ns(ss, o), [i, s] = c.useState(n === void 0);
    return c.useEffect(() => {
      if (n !== void 0) {
        const d = window.setTimeout(() => s(!0), n);
        return () => window.clearTimeout(d);
      }
    }, [n]), i && a.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ l(k.span, { ...r, ref: t }) : null;
  }
);
ls.displayName = ss;
function fa(e, t) {
  return e ? t ? (e.src !== t && (e.src = t), e.complete && e.naturalWidth > 0 ? "loaded" : "loading") : "error" : "idle";
}
function wm(e, { referrerPolicy: t, crossOrigin: o }) {
  const n = gm(), r = c.useRef(null), a = n ? (r.current || (r.current = new window.Image()), r.current) : null, [i, s] = c.useState(
    () => fa(a, e)
  );
  return ne(() => {
    s(fa(a, e));
  }, [a, e]), ne(() => {
    const d = (p) => () => {
      s(p);
    };
    if (!a) return;
    const f = d("loaded"), u = d("error");
    return a.addEventListener("load", f), a.addEventListener("error", u), t && (a.referrerPolicy = t), typeof o == "string" && (a.crossOrigin = o), () => {
      a.removeEventListener("load", f), a.removeEventListener("error", u);
    };
  }, [a, o, t]), i;
}
var xm = rs, ym = is, Cm = ls;
function zt(e) {
  const t = c.useRef({ value: e, previous: e });
  return c.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
function Ft(e) {
  const [t, o] = c.useState(void 0);
  return ne(() => {
    if (e) {
      o({ width: e.offsetWidth, height: e.offsetHeight });
      const n = new ResizeObserver((r) => {
        if (!Array.isArray(r) || !r.length)
          return;
        const a = r[0];
        let i, s;
        if ("borderBoxSize" in a) {
          const d = a.borderBoxSize, f = Array.isArray(d) ? d[0] : d;
          i = f.inlineSize, s = f.blockSize;
        } else
          i = e.offsetWidth, s = e.offsetHeight;
        o({ width: i, height: s });
      });
      return n.observe(e, { box: "border-box" }), () => n.unobserve(e);
    } else
      o(void 0);
  }, [e]), t;
}
var Do = "Checkbox", [Sm, Wx] = te(Do), [Rm, mr] = Sm(Do);
function Em(e) {
  const {
    __scopeCheckbox: t,
    checked: o,
    children: n,
    defaultChecked: r,
    disabled: a,
    form: i,
    name: s,
    onCheckedChange: d,
    required: f,
    value: u = "on",
    // @ts-expect-error
    internal_do_not_use_render: p
  } = e, [m, v] = ae({
    prop: o,
    defaultProp: r ?? !1,
    onChange: d,
    caller: Do
  }), [h, g] = c.useState(null), [b, w] = c.useState(null), x = c.useRef(!1), y = h ? !!i || !!h.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), S = {
    checked: m,
    disabled: a,
    setChecked: v,
    control: h,
    setControl: g,
    name: s,
    form: i,
    value: u,
    hasConsumerStoppedPropagationRef: x,
    required: f,
    defaultChecked: Be(r) ? !1 : r,
    isFormControl: y,
    bubbleInput: b,
    setBubbleInput: w
  };
  return /* @__PURE__ */ l(
    Rm,
    {
      scope: t,
      ...S,
      children: Pm(p) ? p(S) : n
    }
  );
}
var cs = "CheckboxTrigger", ds = c.forwardRef(
  ({ __scopeCheckbox: e, onKeyDown: t, onClick: o, ...n }, r) => {
    const {
      control: a,
      value: i,
      disabled: s,
      checked: d,
      required: f,
      setControl: u,
      setChecked: p,
      hasConsumerStoppedPropagationRef: m,
      isFormControl: v,
      bubbleInput: h
    } = mr(cs, e), g = F(r, u), b = c.useRef(d);
    return c.useEffect(() => {
      const w = a?.form;
      if (w) {
        const x = () => p(b.current);
        return w.addEventListener("reset", x), () => w.removeEventListener("reset", x);
      }
    }, [a, p]), /* @__PURE__ */ l(
      k.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": Be(d) ? "mixed" : d,
        "aria-required": f,
        "data-state": vs(d),
        "data-disabled": s ? "" : void 0,
        disabled: s,
        value: i,
        ...n,
        ref: g,
        onKeyDown: _(t, (w) => {
          w.key === "Enter" && w.preventDefault();
        }),
        onClick: _(o, (w) => {
          p((x) => Be(x) ? !0 : !x), h && v && (m.current = w.isPropagationStopped(), m.current || w.stopPropagation());
        })
      }
    );
  }
);
ds.displayName = cs;
var us = c.forwardRef(
  (e, t) => {
    const {
      __scopeCheckbox: o,
      name: n,
      checked: r,
      defaultChecked: a,
      required: i,
      disabled: s,
      value: d,
      onCheckedChange: f,
      form: u,
      ...p
    } = e;
    return /* @__PURE__ */ l(
      Em,
      {
        __scopeCheckbox: o,
        checked: r,
        defaultChecked: a,
        disabled: s,
        required: i,
        onCheckedChange: f,
        name: n,
        form: u,
        value: d,
        internal_do_not_use_render: ({ isFormControl: m }) => /* @__PURE__ */ K(Ve, { children: [
          /* @__PURE__ */ l(
            ds,
            {
              ...p,
              ref: t,
              __scopeCheckbox: o
            }
          ),
          m && /* @__PURE__ */ l(
            gs,
            {
              __scopeCheckbox: o
            }
          )
        ] })
      }
    );
  }
);
us.displayName = Do;
var fs = "CheckboxIndicator", ps = c.forwardRef(
  (e, t) => {
    const { __scopeCheckbox: o, forceMount: n, ...r } = e, a = mr(fs, o);
    return /* @__PURE__ */ l(
      oe,
      {
        present: n || Be(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ l(
          k.span,
          {
            "data-state": vs(a.checked),
            "data-disabled": a.disabled ? "" : void 0,
            ...r,
            ref: t,
            style: { pointerEvents: "none", ...e.style }
          }
        )
      }
    );
  }
);
ps.displayName = fs;
var ms = "CheckboxBubbleInput", gs = c.forwardRef(
  ({ __scopeCheckbox: e, ...t }, o) => {
    const {
      control: n,
      hasConsumerStoppedPropagationRef: r,
      checked: a,
      defaultChecked: i,
      required: s,
      disabled: d,
      name: f,
      value: u,
      form: p,
      bubbleInput: m,
      setBubbleInput: v
    } = mr(ms, e), h = F(o, v), g = zt(a), b = Ft(n);
    c.useEffect(() => {
      const x = m;
      if (!x) return;
      const y = window.HTMLInputElement.prototype, R = Object.getOwnPropertyDescriptor(
        y,
        "checked"
      ).set, T = !r.current;
      if (g !== a && R) {
        const A = new Event("click", { bubbles: T });
        x.indeterminate = Be(a), R.call(x, Be(a) ? !1 : a), x.dispatchEvent(A);
      }
    }, [m, g, a, r]);
    const w = c.useRef(Be(a) ? !1 : a);
    return /* @__PURE__ */ l(
      k.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: i ?? w.current,
        required: s,
        disabled: d,
        name: f,
        value: u,
        form: p,
        ...t,
        tabIndex: -1,
        ref: h,
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
gs.displayName = ms;
function Pm(e) {
  return typeof e == "function";
}
function Be(e) {
  return e === "indeterminate";
}
function vs(e) {
  return Be(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
const _m = ["top", "right", "bottom", "left"], He = Math.min, me = Math.max, co = Math.round, no = Math.floor, _e = (e) => ({
  x: e,
  y: e
}), Am = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Nm = {
  start: "end",
  end: "start"
};
function kn(e, t, o) {
  return me(e, He(t, o));
}
function Me(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function De(e) {
  return e.split("-")[0];
}
function xt(e) {
  return e.split("-")[1];
}
function gr(e) {
  return e === "x" ? "y" : "x";
}
function vr(e) {
  return e === "y" ? "height" : "width";
}
const Tm = /* @__PURE__ */ new Set(["top", "bottom"]);
function Pe(e) {
  return Tm.has(De(e)) ? "y" : "x";
}
function hr(e) {
  return gr(Pe(e));
}
function km(e, t, o) {
  o === void 0 && (o = !1);
  const n = xt(e), r = hr(e), a = vr(r);
  let i = r === "x" ? n === (o ? "end" : "start") ? "right" : "left" : n === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (i = uo(i)), [i, uo(i)];
}
function Im(e) {
  const t = uo(e);
  return [In(e), t, In(t)];
}
function In(e) {
  return e.replace(/start|end/g, (t) => Nm[t]);
}
const pa = ["left", "right"], ma = ["right", "left"], Mm = ["top", "bottom"], Dm = ["bottom", "top"];
function Om(e, t, o) {
  switch (e) {
    case "top":
    case "bottom":
      return o ? t ? ma : pa : t ? pa : ma;
    case "left":
    case "right":
      return t ? Mm : Dm;
    default:
      return [];
  }
}
function Lm(e, t, o, n) {
  const r = xt(e);
  let a = Om(De(e), o === "start", n);
  return r && (a = a.map((i) => i + "-" + r), t && (a = a.concat(a.map(In)))), a;
}
function uo(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Am[t]);
}
function $m(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function hs(e) {
  return typeof e != "number" ? $m(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function fo(e) {
  const {
    x: t,
    y: o,
    width: n,
    height: r
  } = e;
  return {
    width: n,
    height: r,
    top: o,
    left: t,
    right: t + n,
    bottom: o + r,
    x: t,
    y: o
  };
}
function ga(e, t, o) {
  let {
    reference: n,
    floating: r
  } = e;
  const a = Pe(t), i = hr(t), s = vr(i), d = De(t), f = a === "y", u = n.x + n.width / 2 - r.width / 2, p = n.y + n.height / 2 - r.height / 2, m = n[s] / 2 - r[s] / 2;
  let v;
  switch (d) {
    case "top":
      v = {
        x: u,
        y: n.y - r.height
      };
      break;
    case "bottom":
      v = {
        x: u,
        y: n.y + n.height
      };
      break;
    case "right":
      v = {
        x: n.x + n.width,
        y: p
      };
      break;
    case "left":
      v = {
        x: n.x - r.width,
        y: p
      };
      break;
    default:
      v = {
        x: n.x,
        y: n.y
      };
  }
  switch (xt(t)) {
    case "start":
      v[i] -= m * (o && f ? -1 : 1);
      break;
    case "end":
      v[i] += m * (o && f ? -1 : 1);
      break;
  }
  return v;
}
const zm = async (e, t, o) => {
  const {
    placement: n = "bottom",
    strategy: r = "absolute",
    middleware: a = [],
    platform: i
  } = o, s = a.filter(Boolean), d = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let f = await i.getElementRects({
    reference: e,
    floating: t,
    strategy: r
  }), {
    x: u,
    y: p
  } = ga(f, n, d), m = n, v = {}, h = 0;
  for (let g = 0; g < s.length; g++) {
    const {
      name: b,
      fn: w
    } = s[g], {
      x,
      y,
      data: S,
      reset: R
    } = await w({
      x: u,
      y: p,
      initialPlacement: n,
      placement: m,
      strategy: r,
      middlewareData: v,
      rects: f,
      platform: i,
      elements: {
        reference: e,
        floating: t
      }
    });
    u = x ?? u, p = y ?? p, v = {
      ...v,
      [b]: {
        ...v[b],
        ...S
      }
    }, R && h <= 50 && (h++, typeof R == "object" && (R.placement && (m = R.placement), R.rects && (f = R.rects === !0 ? await i.getElementRects({
      reference: e,
      floating: t,
      strategy: r
    }) : R.rects), {
      x: u,
      y: p
    } = ga(f, m, d)), g = -1);
  }
  return {
    x: u,
    y: p,
    placement: m,
    strategy: r,
    middlewareData: v
  };
};
async function Nt(e, t) {
  var o;
  t === void 0 && (t = {});
  const {
    x: n,
    y: r,
    platform: a,
    rects: i,
    elements: s,
    strategy: d
  } = e, {
    boundary: f = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: p = "floating",
    altBoundary: m = !1,
    padding: v = 0
  } = Me(t, e), h = hs(v), b = s[m ? p === "floating" ? "reference" : "floating" : p], w = fo(await a.getClippingRect({
    element: (o = await (a.isElement == null ? void 0 : a.isElement(b))) == null || o ? b : b.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(s.floating)),
    boundary: f,
    rootBoundary: u,
    strategy: d
  })), x = p === "floating" ? {
    x: n,
    y: r,
    width: i.floating.width,
    height: i.floating.height
  } : i.reference, y = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(s.floating)), S = await (a.isElement == null ? void 0 : a.isElement(y)) ? await (a.getScale == null ? void 0 : a.getScale(y)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, R = fo(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: s,
    rect: x,
    offsetParent: y,
    strategy: d
  }) : x);
  return {
    top: (w.top - R.top + h.top) / S.y,
    bottom: (R.bottom - w.bottom + h.bottom) / S.y,
    left: (w.left - R.left + h.left) / S.x,
    right: (R.right - w.right + h.right) / S.x
  };
}
const Fm = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: o,
      y: n,
      placement: r,
      rects: a,
      platform: i,
      elements: s,
      middlewareData: d
    } = t, {
      element: f,
      padding: u = 0
    } = Me(e, t) || {};
    if (f == null)
      return {};
    const p = hs(u), m = {
      x: o,
      y: n
    }, v = hr(r), h = vr(v), g = await i.getDimensions(f), b = v === "y", w = b ? "top" : "left", x = b ? "bottom" : "right", y = b ? "clientHeight" : "clientWidth", S = a.reference[h] + a.reference[v] - m[v] - a.floating[h], R = m[v] - a.reference[v], T = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(f));
    let A = T ? T[y] : 0;
    (!A || !await (i.isElement == null ? void 0 : i.isElement(T))) && (A = s.floating[y] || a.floating[h]);
    const E = S / 2 - R / 2, M = A / 2 - g[h] / 2 - 1, $ = He(p[w], M), z = He(p[x], M), V = $, H = A - g[h] - z, G = A / 2 - g[h] / 2 + E, U = kn(V, G, H), L = !d.arrow && xt(r) != null && G !== U && a.reference[h] / 2 - (G < V ? $ : z) - g[h] / 2 < 0, B = L ? G < V ? G - V : G - H : 0;
    return {
      [v]: m[v] + B,
      data: {
        [v]: U,
        centerOffset: G - U - B,
        ...L && {
          alignmentOffset: B
        }
      },
      reset: L
    };
  }
}), Bm = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var o, n;
      const {
        placement: r,
        middlewareData: a,
        rects: i,
        initialPlacement: s,
        platform: d,
        elements: f
      } = t, {
        mainAxis: u = !0,
        crossAxis: p = !0,
        fallbackPlacements: m,
        fallbackStrategy: v = "bestFit",
        fallbackAxisSideDirection: h = "none",
        flipAlignment: g = !0,
        ...b
      } = Me(e, t);
      if ((o = a.arrow) != null && o.alignmentOffset)
        return {};
      const w = De(r), x = Pe(s), y = De(s) === s, S = await (d.isRTL == null ? void 0 : d.isRTL(f.floating)), R = m || (y || !g ? [uo(s)] : Im(s)), T = h !== "none";
      !m && T && R.push(...Lm(s, g, h, S));
      const A = [s, ...R], E = await Nt(t, b), M = [];
      let $ = ((n = a.flip) == null ? void 0 : n.overflows) || [];
      if (u && M.push(E[w]), p) {
        const G = km(r, i, S);
        M.push(E[G[0]], E[G[1]]);
      }
      if ($ = [...$, {
        placement: r,
        overflows: M
      }], !M.every((G) => G <= 0)) {
        var z, V;
        const G = (((z = a.flip) == null ? void 0 : z.index) || 0) + 1, U = A[G];
        if (U && (!(p === "alignment" ? x !== Pe(U) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        $.every((P) => Pe(P.placement) === x ? P.overflows[0] > 0 : !0)))
          return {
            data: {
              index: G,
              overflows: $
            },
            reset: {
              placement: U
            }
          };
        let L = (V = $.filter((B) => B.overflows[0] <= 0).sort((B, P) => B.overflows[1] - P.overflows[1])[0]) == null ? void 0 : V.placement;
        if (!L)
          switch (v) {
            case "bestFit": {
              var H;
              const B = (H = $.filter((P) => {
                if (T) {
                  const I = Pe(P.placement);
                  return I === x || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  I === "y";
                }
                return !0;
              }).map((P) => [P.placement, P.overflows.filter((I) => I > 0).reduce((I, ee) => I + ee, 0)]).sort((P, I) => P[1] - I[1])[0]) == null ? void 0 : H[0];
              B && (L = B);
              break;
            }
            case "initialPlacement":
              L = s;
              break;
          }
        if (r !== L)
          return {
            reset: {
              placement: L
            }
          };
      }
      return {};
    }
  };
};
function va(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function ha(e) {
  return _m.some((t) => e[t] >= 0);
}
const Vm = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: o
      } = t, {
        strategy: n = "referenceHidden",
        ...r
      } = Me(e, t);
      switch (n) {
        case "referenceHidden": {
          const a = await Nt(t, {
            ...r,
            elementContext: "reference"
          }), i = va(a, o.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: ha(i)
            }
          };
        }
        case "escaped": {
          const a = await Nt(t, {
            ...r,
            altBoundary: !0
          }), i = va(a, o.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: ha(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, bs = /* @__PURE__ */ new Set(["left", "top"]);
async function Gm(e, t) {
  const {
    placement: o,
    platform: n,
    elements: r
  } = e, a = await (n.isRTL == null ? void 0 : n.isRTL(r.floating)), i = De(o), s = xt(o), d = Pe(o) === "y", f = bs.has(i) ? -1 : 1, u = a && d ? -1 : 1, p = Me(t, e);
  let {
    mainAxis: m,
    crossAxis: v,
    alignmentAxis: h
  } = typeof p == "number" ? {
    mainAxis: p,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: p.mainAxis || 0,
    crossAxis: p.crossAxis || 0,
    alignmentAxis: p.alignmentAxis
  };
  return s && typeof h == "number" && (v = s === "end" ? h * -1 : h), d ? {
    x: v * u,
    y: m * f
  } : {
    x: m * f,
    y: v * u
  };
}
const Hm = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var o, n;
      const {
        x: r,
        y: a,
        placement: i,
        middlewareData: s
      } = t, d = await Gm(t, e);
      return i === ((o = s.offset) == null ? void 0 : o.placement) && (n = s.arrow) != null && n.alignmentOffset ? {} : {
        x: r + d.x,
        y: a + d.y,
        data: {
          ...d,
          placement: i
        }
      };
    }
  };
}, Wm = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: o,
        y: n,
        placement: r
      } = t, {
        mainAxis: a = !0,
        crossAxis: i = !1,
        limiter: s = {
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
        ...d
      } = Me(e, t), f = {
        x: o,
        y: n
      }, u = await Nt(t, d), p = Pe(De(r)), m = gr(p);
      let v = f[m], h = f[p];
      if (a) {
        const b = m === "y" ? "top" : "left", w = m === "y" ? "bottom" : "right", x = v + u[b], y = v - u[w];
        v = kn(x, v, y);
      }
      if (i) {
        const b = p === "y" ? "top" : "left", w = p === "y" ? "bottom" : "right", x = h + u[b], y = h - u[w];
        h = kn(x, h, y);
      }
      const g = s.fn({
        ...t,
        [m]: v,
        [p]: h
      });
      return {
        ...g,
        data: {
          x: g.x - o,
          y: g.y - n,
          enabled: {
            [m]: a,
            [p]: i
          }
        }
      };
    }
  };
}, Um = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: o,
        y: n,
        placement: r,
        rects: a,
        middlewareData: i
      } = t, {
        offset: s = 0,
        mainAxis: d = !0,
        crossAxis: f = !0
      } = Me(e, t), u = {
        x: o,
        y: n
      }, p = Pe(r), m = gr(p);
      let v = u[m], h = u[p];
      const g = Me(s, t), b = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (d) {
        const y = m === "y" ? "height" : "width", S = a.reference[m] - a.floating[y] + b.mainAxis, R = a.reference[m] + a.reference[y] - b.mainAxis;
        v < S ? v = S : v > R && (v = R);
      }
      if (f) {
        var w, x;
        const y = m === "y" ? "width" : "height", S = bs.has(De(r)), R = a.reference[p] - a.floating[y] + (S && ((w = i.offset) == null ? void 0 : w[p]) || 0) + (S ? 0 : b.crossAxis), T = a.reference[p] + a.reference[y] + (S ? 0 : ((x = i.offset) == null ? void 0 : x[p]) || 0) - (S ? b.crossAxis : 0);
        h < R ? h = R : h > T && (h = T);
      }
      return {
        [m]: v,
        [p]: h
      };
    }
  };
}, Km = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var o, n;
      const {
        placement: r,
        rects: a,
        platform: i,
        elements: s
      } = t, {
        apply: d = () => {
        },
        ...f
      } = Me(e, t), u = await Nt(t, f), p = De(r), m = xt(r), v = Pe(r) === "y", {
        width: h,
        height: g
      } = a.floating;
      let b, w;
      p === "top" || p === "bottom" ? (b = p, w = m === (await (i.isRTL == null ? void 0 : i.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (w = p, b = m === "end" ? "top" : "bottom");
      const x = g - u.top - u.bottom, y = h - u.left - u.right, S = He(g - u[b], x), R = He(h - u[w], y), T = !t.middlewareData.shift;
      let A = S, E = R;
      if ((o = t.middlewareData.shift) != null && o.enabled.x && (E = y), (n = t.middlewareData.shift) != null && n.enabled.y && (A = x), T && !m) {
        const $ = me(u.left, 0), z = me(u.right, 0), V = me(u.top, 0), H = me(u.bottom, 0);
        v ? E = h - 2 * ($ !== 0 || z !== 0 ? $ + z : me(u.left, u.right)) : A = g - 2 * (V !== 0 || H !== 0 ? V + H : me(u.top, u.bottom));
      }
      await d({
        ...t,
        availableWidth: E,
        availableHeight: A
      });
      const M = await i.getDimensions(s.floating);
      return h !== M.width || g !== M.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Oo() {
  return typeof window < "u";
}
function yt(e) {
  return ws(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function ge(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Ne(e) {
  var t;
  return (t = (ws(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function ws(e) {
  return Oo() ? e instanceof Node || e instanceof ge(e).Node : !1;
}
function ye(e) {
  return Oo() ? e instanceof Element || e instanceof ge(e).Element : !1;
}
function Ae(e) {
  return Oo() ? e instanceof HTMLElement || e instanceof ge(e).HTMLElement : !1;
}
function ba(e) {
  return !Oo() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof ge(e).ShadowRoot;
}
const jm = /* @__PURE__ */ new Set(["inline", "contents"]);
function Bt(e) {
  const {
    overflow: t,
    overflowX: o,
    overflowY: n,
    display: r
  } = Ce(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + n + o) && !jm.has(r);
}
const Ym = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Xm(e) {
  return Ym.has(yt(e));
}
const qm = [":popover-open", ":modal"];
function Lo(e) {
  return qm.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const Zm = ["transform", "translate", "scale", "rotate", "perspective"], Qm = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Jm = ["paint", "layout", "strict", "content"];
function br(e) {
  const t = wr(), o = ye(e) ? Ce(e) : e;
  return Zm.some((n) => o[n] ? o[n] !== "none" : !1) || (o.containerType ? o.containerType !== "normal" : !1) || !t && (o.backdropFilter ? o.backdropFilter !== "none" : !1) || !t && (o.filter ? o.filter !== "none" : !1) || Qm.some((n) => (o.willChange || "").includes(n)) || Jm.some((n) => (o.contain || "").includes(n));
}
function eg(e) {
  let t = We(e);
  for (; Ae(t) && !mt(t); ) {
    if (br(t))
      return t;
    if (Lo(t))
      return null;
    t = We(t);
  }
  return null;
}
function wr() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const tg = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function mt(e) {
  return tg.has(yt(e));
}
function Ce(e) {
  return ge(e).getComputedStyle(e);
}
function $o(e) {
  return ye(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function We(e) {
  if (yt(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    ba(e) && e.host || // Fallback.
    Ne(e)
  );
  return ba(t) ? t.host : t;
}
function xs(e) {
  const t = We(e);
  return mt(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Ae(t) && Bt(t) ? t : xs(t);
}
function Tt(e, t, o) {
  var n;
  t === void 0 && (t = []), o === void 0 && (o = !0);
  const r = xs(e), a = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = ge(r);
  if (a) {
    const s = Mn(i);
    return t.concat(i, i.visualViewport || [], Bt(r) ? r : [], s && o ? Tt(s) : []);
  }
  return t.concat(r, Tt(r, [], o));
}
function Mn(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function ys(e) {
  const t = Ce(e);
  let o = parseFloat(t.width) || 0, n = parseFloat(t.height) || 0;
  const r = Ae(e), a = r ? e.offsetWidth : o, i = r ? e.offsetHeight : n, s = co(o) !== a || co(n) !== i;
  return s && (o = a, n = i), {
    width: o,
    height: n,
    $: s
  };
}
function xr(e) {
  return ye(e) ? e : e.contextElement;
}
function pt(e) {
  const t = xr(e);
  if (!Ae(t))
    return _e(1);
  const o = t.getBoundingClientRect(), {
    width: n,
    height: r,
    $: a
  } = ys(t);
  let i = (a ? co(o.width) : o.width) / n, s = (a ? co(o.height) : o.height) / r;
  return (!i || !Number.isFinite(i)) && (i = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: i,
    y: s
  };
}
const og = /* @__PURE__ */ _e(0);
function Cs(e) {
  const t = ge(e);
  return !wr() || !t.visualViewport ? og : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function ng(e, t, o) {
  return t === void 0 && (t = !1), !o || t && o !== ge(e) ? !1 : t;
}
function et(e, t, o, n) {
  t === void 0 && (t = !1), o === void 0 && (o = !1);
  const r = e.getBoundingClientRect(), a = xr(e);
  let i = _e(1);
  t && (n ? ye(n) && (i = pt(n)) : i = pt(e));
  const s = ng(a, o, n) ? Cs(a) : _e(0);
  let d = (r.left + s.x) / i.x, f = (r.top + s.y) / i.y, u = r.width / i.x, p = r.height / i.y;
  if (a) {
    const m = ge(a), v = n && ye(n) ? ge(n) : n;
    let h = m, g = Mn(h);
    for (; g && n && v !== h; ) {
      const b = pt(g), w = g.getBoundingClientRect(), x = Ce(g), y = w.left + (g.clientLeft + parseFloat(x.paddingLeft)) * b.x, S = w.top + (g.clientTop + parseFloat(x.paddingTop)) * b.y;
      d *= b.x, f *= b.y, u *= b.x, p *= b.y, d += y, f += S, h = ge(g), g = Mn(h);
    }
  }
  return fo({
    width: u,
    height: p,
    x: d,
    y: f
  });
}
function zo(e, t) {
  const o = $o(e).scrollLeft;
  return t ? t.left + o : et(Ne(e)).left + o;
}
function Ss(e, t) {
  const o = e.getBoundingClientRect(), n = o.left + t.scrollLeft - zo(e, o), r = o.top + t.scrollTop;
  return {
    x: n,
    y: r
  };
}
function rg(e) {
  let {
    elements: t,
    rect: o,
    offsetParent: n,
    strategy: r
  } = e;
  const a = r === "fixed", i = Ne(n), s = t ? Lo(t.floating) : !1;
  if (n === i || s && a)
    return o;
  let d = {
    scrollLeft: 0,
    scrollTop: 0
  }, f = _e(1);
  const u = _e(0), p = Ae(n);
  if ((p || !p && !a) && ((yt(n) !== "body" || Bt(i)) && (d = $o(n)), Ae(n))) {
    const v = et(n);
    f = pt(n), u.x = v.x + n.clientLeft, u.y = v.y + n.clientTop;
  }
  const m = i && !p && !a ? Ss(i, d) : _e(0);
  return {
    width: o.width * f.x,
    height: o.height * f.y,
    x: o.x * f.x - d.scrollLeft * f.x + u.x + m.x,
    y: o.y * f.y - d.scrollTop * f.y + u.y + m.y
  };
}
function ag(e) {
  return Array.from(e.getClientRects());
}
function ig(e) {
  const t = Ne(e), o = $o(e), n = e.ownerDocument.body, r = me(t.scrollWidth, t.clientWidth, n.scrollWidth, n.clientWidth), a = me(t.scrollHeight, t.clientHeight, n.scrollHeight, n.clientHeight);
  let i = -o.scrollLeft + zo(e);
  const s = -o.scrollTop;
  return Ce(n).direction === "rtl" && (i += me(t.clientWidth, n.clientWidth) - r), {
    width: r,
    height: a,
    x: i,
    y: s
  };
}
const wa = 25;
function sg(e, t) {
  const o = ge(e), n = Ne(e), r = o.visualViewport;
  let a = n.clientWidth, i = n.clientHeight, s = 0, d = 0;
  if (r) {
    a = r.width, i = r.height;
    const u = wr();
    (!u || u && t === "fixed") && (s = r.offsetLeft, d = r.offsetTop);
  }
  const f = zo(n);
  if (f <= 0) {
    const u = n.ownerDocument, p = u.body, m = getComputedStyle(p), v = u.compatMode === "CSS1Compat" && parseFloat(m.marginLeft) + parseFloat(m.marginRight) || 0, h = Math.abs(n.clientWidth - p.clientWidth - v);
    h <= wa && (a -= h);
  } else f <= wa && (a += f);
  return {
    width: a,
    height: i,
    x: s,
    y: d
  };
}
const lg = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function cg(e, t) {
  const o = et(e, !0, t === "fixed"), n = o.top + e.clientTop, r = o.left + e.clientLeft, a = Ae(e) ? pt(e) : _e(1), i = e.clientWidth * a.x, s = e.clientHeight * a.y, d = r * a.x, f = n * a.y;
  return {
    width: i,
    height: s,
    x: d,
    y: f
  };
}
function xa(e, t, o) {
  let n;
  if (t === "viewport")
    n = sg(e, o);
  else if (t === "document")
    n = ig(Ne(e));
  else if (ye(t))
    n = cg(t, o);
  else {
    const r = Cs(e);
    n = {
      x: t.x - r.x,
      y: t.y - r.y,
      width: t.width,
      height: t.height
    };
  }
  return fo(n);
}
function Rs(e, t) {
  const o = We(e);
  return o === t || !ye(o) || mt(o) ? !1 : Ce(o).position === "fixed" || Rs(o, t);
}
function dg(e, t) {
  const o = t.get(e);
  if (o)
    return o;
  let n = Tt(e, [], !1).filter((s) => ye(s) && yt(s) !== "body"), r = null;
  const a = Ce(e).position === "fixed";
  let i = a ? We(e) : e;
  for (; ye(i) && !mt(i); ) {
    const s = Ce(i), d = br(i);
    !d && s.position === "fixed" && (r = null), (a ? !d && !r : !d && s.position === "static" && !!r && lg.has(r.position) || Bt(i) && !d && Rs(e, i)) ? n = n.filter((u) => u !== i) : r = s, i = We(i);
  }
  return t.set(e, n), n;
}
function ug(e) {
  let {
    element: t,
    boundary: o,
    rootBoundary: n,
    strategy: r
  } = e;
  const i = [...o === "clippingAncestors" ? Lo(t) ? [] : dg(t, this._c) : [].concat(o), n], s = i[0], d = i.reduce((f, u) => {
    const p = xa(t, u, r);
    return f.top = me(p.top, f.top), f.right = He(p.right, f.right), f.bottom = He(p.bottom, f.bottom), f.left = me(p.left, f.left), f;
  }, xa(t, s, r));
  return {
    width: d.right - d.left,
    height: d.bottom - d.top,
    x: d.left,
    y: d.top
  };
}
function fg(e) {
  const {
    width: t,
    height: o
  } = ys(e);
  return {
    width: t,
    height: o
  };
}
function pg(e, t, o) {
  const n = Ae(t), r = Ne(t), a = o === "fixed", i = et(e, !0, a, t);
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const d = _e(0);
  function f() {
    d.x = zo(r);
  }
  if (n || !n && !a)
    if ((yt(t) !== "body" || Bt(r)) && (s = $o(t)), n) {
      const v = et(t, !0, a, t);
      d.x = v.x + t.clientLeft, d.y = v.y + t.clientTop;
    } else r && f();
  a && !n && r && f();
  const u = r && !n && !a ? Ss(r, s) : _e(0), p = i.left + s.scrollLeft - d.x - u.x, m = i.top + s.scrollTop - d.y - u.y;
  return {
    x: p,
    y: m,
    width: i.width,
    height: i.height
  };
}
function xn(e) {
  return Ce(e).position === "static";
}
function ya(e, t) {
  if (!Ae(e) || Ce(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let o = e.offsetParent;
  return Ne(e) === o && (o = o.ownerDocument.body), o;
}
function Es(e, t) {
  const o = ge(e);
  if (Lo(e))
    return o;
  if (!Ae(e)) {
    let r = We(e);
    for (; r && !mt(r); ) {
      if (ye(r) && !xn(r))
        return r;
      r = We(r);
    }
    return o;
  }
  let n = ya(e, t);
  for (; n && Xm(n) && xn(n); )
    n = ya(n, t);
  return n && mt(n) && xn(n) && !br(n) ? o : n || eg(e) || o;
}
const mg = async function(e) {
  const t = this.getOffsetParent || Es, o = this.getDimensions, n = await o(e.floating);
  return {
    reference: pg(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: n.width,
      height: n.height
    }
  };
};
function gg(e) {
  return Ce(e).direction === "rtl";
}
const vg = {
  convertOffsetParentRelativeRectToViewportRelativeRect: rg,
  getDocumentElement: Ne,
  getClippingRect: ug,
  getOffsetParent: Es,
  getElementRects: mg,
  getClientRects: ag,
  getDimensions: fg,
  getScale: pt,
  isElement: ye,
  isRTL: gg
};
function Ps(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function hg(e, t) {
  let o = null, n;
  const r = Ne(e);
  function a() {
    var s;
    clearTimeout(n), (s = o) == null || s.disconnect(), o = null;
  }
  function i(s, d) {
    s === void 0 && (s = !1), d === void 0 && (d = 1), a();
    const f = e.getBoundingClientRect(), {
      left: u,
      top: p,
      width: m,
      height: v
    } = f;
    if (s || t(), !m || !v)
      return;
    const h = no(p), g = no(r.clientWidth - (u + m)), b = no(r.clientHeight - (p + v)), w = no(u), y = {
      rootMargin: -h + "px " + -g + "px " + -b + "px " + -w + "px",
      threshold: me(0, He(1, d)) || 1
    };
    let S = !0;
    function R(T) {
      const A = T[0].intersectionRatio;
      if (A !== d) {
        if (!S)
          return i();
        A ? i(!1, A) : n = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      A === 1 && !Ps(f, e.getBoundingClientRect()) && i(), S = !1;
    }
    try {
      o = new IntersectionObserver(R, {
        ...y,
        // Handle <iframe>s
        root: r.ownerDocument
      });
    } catch {
      o = new IntersectionObserver(R, y);
    }
    o.observe(e);
  }
  return i(!0), a;
}
function bg(e, t, o, n) {
  n === void 0 && (n = {});
  const {
    ancestorScroll: r = !0,
    ancestorResize: a = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: s = typeof IntersectionObserver == "function",
    animationFrame: d = !1
  } = n, f = xr(e), u = r || a ? [...f ? Tt(f) : [], ...Tt(t)] : [];
  u.forEach((w) => {
    r && w.addEventListener("scroll", o, {
      passive: !0
    }), a && w.addEventListener("resize", o);
  });
  const p = f && s ? hg(f, o) : null;
  let m = -1, v = null;
  i && (v = new ResizeObserver((w) => {
    let [x] = w;
    x && x.target === f && v && (v.unobserve(t), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      var y;
      (y = v) == null || y.observe(t);
    })), o();
  }), f && !d && v.observe(f), v.observe(t));
  let h, g = d ? et(e) : null;
  d && b();
  function b() {
    const w = et(e);
    g && !Ps(g, w) && o(), g = w, h = requestAnimationFrame(b);
  }
  return o(), () => {
    var w;
    u.forEach((x) => {
      r && x.removeEventListener("scroll", o), a && x.removeEventListener("resize", o);
    }), p?.(), (w = v) == null || w.disconnect(), v = null, d && cancelAnimationFrame(h);
  };
}
const wg = Hm, xg = Wm, yg = Bm, Cg = Km, Sg = Vm, Ca = Fm, Rg = Um, Eg = (e, t, o) => {
  const n = /* @__PURE__ */ new Map(), r = {
    platform: vg,
    ...o
  }, a = {
    ...r.platform,
    _c: n
  };
  return zm(e, t, {
    ...r,
    platform: a
  });
};
var Pg = typeof document < "u", _g = function() {
}, io = Pg ? Qd : _g;
function po(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let o, n, r;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (o = e.length, o !== t.length) return !1;
      for (n = o; n-- !== 0; )
        if (!po(e[n], t[n]))
          return !1;
      return !0;
    }
    if (r = Object.keys(e), o = r.length, o !== Object.keys(t).length)
      return !1;
    for (n = o; n-- !== 0; )
      if (!{}.hasOwnProperty.call(t, r[n]))
        return !1;
    for (n = o; n-- !== 0; ) {
      const a = r[n];
      if (!(a === "_owner" && e.$$typeof) && !po(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function _s(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Sa(e, t) {
  const o = _s(e);
  return Math.round(t * o) / o;
}
function yn(e) {
  const t = c.useRef(e);
  return io(() => {
    t.current = e;
  }), t;
}
function Ag(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: o = "absolute",
    middleware: n = [],
    platform: r,
    elements: {
      reference: a,
      floating: i
    } = {},
    transform: s = !0,
    whileElementsMounted: d,
    open: f
  } = e, [u, p] = c.useState({
    x: 0,
    y: 0,
    strategy: o,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [m, v] = c.useState(n);
  po(m, n) || v(n);
  const [h, g] = c.useState(null), [b, w] = c.useState(null), x = c.useCallback((P) => {
    P !== T.current && (T.current = P, g(P));
  }, []), y = c.useCallback((P) => {
    P !== A.current && (A.current = P, w(P));
  }, []), S = a || h, R = i || b, T = c.useRef(null), A = c.useRef(null), E = c.useRef(u), M = d != null, $ = yn(d), z = yn(r), V = yn(f), H = c.useCallback(() => {
    if (!T.current || !A.current)
      return;
    const P = {
      placement: t,
      strategy: o,
      middleware: m
    };
    z.current && (P.platform = z.current), Eg(T.current, A.current, P).then((I) => {
      const ee = {
        ...I,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: V.current !== !1
      };
      G.current && !po(E.current, ee) && (E.current = ee, So.flushSync(() => {
        p(ee);
      }));
    });
  }, [m, t, o, z, V]);
  io(() => {
    f === !1 && E.current.isPositioned && (E.current.isPositioned = !1, p((P) => ({
      ...P,
      isPositioned: !1
    })));
  }, [f]);
  const G = c.useRef(!1);
  io(() => (G.current = !0, () => {
    G.current = !1;
  }), []), io(() => {
    if (S && (T.current = S), R && (A.current = R), S && R) {
      if ($.current)
        return $.current(S, R, H);
      H();
    }
  }, [S, R, H, $, M]);
  const U = c.useMemo(() => ({
    reference: T,
    floating: A,
    setReference: x,
    setFloating: y
  }), [x, y]), L = c.useMemo(() => ({
    reference: S,
    floating: R
  }), [S, R]), B = c.useMemo(() => {
    const P = {
      position: o,
      left: 0,
      top: 0
    };
    if (!L.floating)
      return P;
    const I = Sa(L.floating, u.x), ee = Sa(L.floating, u.y);
    return s ? {
      ...P,
      transform: "translate(" + I + "px, " + ee + "px)",
      ..._s(L.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: o,
      left: I,
      top: ee
    };
  }, [o, s, L.floating, u.x, u.y]);
  return c.useMemo(() => ({
    ...u,
    update: H,
    refs: U,
    elements: L,
    floatingStyles: B
  }), [u, H, U, L, B]);
}
const Ng = (e) => {
  function t(o) {
    return {}.hasOwnProperty.call(o, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(o) {
      const {
        element: n,
        padding: r
      } = typeof e == "function" ? e(o) : e;
      return n && t(n) ? n.current != null ? Ca({
        element: n.current,
        padding: r
      }).fn(o) : {} : n ? Ca({
        element: n,
        padding: r
      }).fn(o) : {};
    }
  };
}, Tg = (e, t) => ({
  ...wg(e),
  options: [e, t]
}), kg = (e, t) => ({
  ...xg(e),
  options: [e, t]
}), Ig = (e, t) => ({
  ...Rg(e),
  options: [e, t]
}), Mg = (e, t) => ({
  ...yg(e),
  options: [e, t]
}), Dg = (e, t) => ({
  ...Cg(e),
  options: [e, t]
}), Og = (e, t) => ({
  ...Sg(e),
  options: [e, t]
}), Lg = (e, t) => ({
  ...Ng(e),
  options: [e, t]
});
var $g = "Arrow", As = c.forwardRef((e, t) => {
  const { children: o, width: n = 10, height: r = 5, ...a } = e;
  return /* @__PURE__ */ l(
    k.svg,
    {
      ...a,
      ref: t,
      width: n,
      height: r,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? o : /* @__PURE__ */ l("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
As.displayName = $g;
var zg = As, yr = "Popper", [Ns, Te] = te(yr), [Fg, Ts] = Ns(yr), ks = (e) => {
  const { __scopePopper: t, children: o } = e, [n, r] = c.useState(null);
  return /* @__PURE__ */ l(Fg, { scope: t, anchor: n, onAnchorChange: r, children: o });
};
ks.displayName = yr;
var Is = "PopperAnchor", Ms = c.forwardRef(
  (e, t) => {
    const { __scopePopper: o, virtualRef: n, ...r } = e, a = Ts(Is, o), i = c.useRef(null), s = F(t, i), d = c.useRef(null);
    return c.useEffect(() => {
      const f = d.current;
      d.current = n?.current || i.current, f !== d.current && a.onAnchorChange(d.current);
    }), n ? null : /* @__PURE__ */ l(k.div, { ...r, ref: s });
  }
);
Ms.displayName = Is;
var Cr = "PopperContent", [Bg, Vg] = Ns(Cr), Ds = c.forwardRef(
  (e, t) => {
    const {
      __scopePopper: o,
      side: n = "bottom",
      sideOffset: r = 0,
      align: a = "center",
      alignOffset: i = 0,
      arrowPadding: s = 0,
      avoidCollisions: d = !0,
      collisionBoundary: f = [],
      collisionPadding: u = 0,
      sticky: p = "partial",
      hideWhenDetached: m = !1,
      updatePositionStrategy: v = "optimized",
      onPlaced: h,
      ...g
    } = e, b = Ts(Cr, o), [w, x] = c.useState(null), y = F(t, (N) => x(N)), [S, R] = c.useState(null), T = Ft(S), A = T?.width ?? 0, E = T?.height ?? 0, M = n + (a !== "center" ? "-" + a : ""), $ = typeof u == "number" ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u }, z = Array.isArray(f) ? f : [f], V = z.length > 0, H = {
      padding: $,
      boundary: z.filter(Hg),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: V
    }, { refs: G, floatingStyles: U, placement: L, isPositioned: B, middlewareData: P } = Ag({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: M,
      whileElementsMounted: (...N) => bg(...N, {
        animationFrame: v === "always"
      }),
      elements: {
        reference: b.anchor
      },
      middleware: [
        Tg({ mainAxis: r + E, alignmentAxis: i }),
        d && kg({
          mainAxis: !0,
          crossAxis: !1,
          limiter: p === "partial" ? Ig() : void 0,
          ...H
        }),
        d && Mg({ ...H }),
        Dg({
          ...H,
          apply: ({ elements: N, rects: X, availableWidth: re, availableHeight: Y }) => {
            const { width: q, height: J } = X.reference, ve = N.floating.style;
            ve.setProperty("--radix-popper-available-width", `${re}px`), ve.setProperty("--radix-popper-available-height", `${Y}px`), ve.setProperty("--radix-popper-anchor-width", `${q}px`), ve.setProperty("--radix-popper-anchor-height", `${J}px`);
          }
        }),
        S && Lg({ element: S, padding: s }),
        Wg({ arrowWidth: A, arrowHeight: E }),
        m && Og({ strategy: "referenceHidden", ...H })
      ]
    }), [I, ee] = $s(L), le = se(h);
    ne(() => {
      B && le?.();
    }, [B, le]);
    const fe = P.arrow?.x, Q = P.arrow?.y, Z = P.arrow?.centerOffset !== 0, [pe, ce] = c.useState();
    return ne(() => {
      w && ce(window.getComputedStyle(w).zIndex);
    }, [w]), /* @__PURE__ */ l(
      "div",
      {
        ref: G.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...U,
          transform: B ? U.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: pe,
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
          Bg,
          {
            scope: o,
            placedSide: I,
            onArrowChange: R,
            arrowX: fe,
            arrowY: Q,
            shouldHideArrow: Z,
            children: /* @__PURE__ */ l(
              k.div,
              {
                "data-side": I,
                "data-align": ee,
                ...g,
                ref: y,
                style: {
                  ...g.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: B ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
Ds.displayName = Cr;
var Os = "PopperArrow", Gg = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Ls = c.forwardRef(function(t, o) {
  const { __scopePopper: n, ...r } = t, a = Vg(Os, n), i = Gg[a.placedSide];
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
          [i]: 0,
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
          zg,
          {
            ...r,
            ref: o,
            style: {
              ...r.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
Ls.displayName = Os;
function Hg(e) {
  return e !== null;
}
var Wg = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: o, rects: n, middlewareData: r } = t, i = r.arrow?.centerOffset !== 0, s = i ? 0 : e.arrowWidth, d = i ? 0 : e.arrowHeight, [f, u] = $s(o), p = { start: "0%", center: "50%", end: "100%" }[u], m = (r.arrow?.x ?? 0) + s / 2, v = (r.arrow?.y ?? 0) + d / 2;
    let h = "", g = "";
    return f === "bottom" ? (h = i ? p : `${m}px`, g = `${-d}px`) : f === "top" ? (h = i ? p : `${m}px`, g = `${n.floating.height + d}px`) : f === "right" ? (h = `${-d}px`, g = i ? p : `${v}px`) : f === "left" && (h = `${n.floating.width + d}px`, g = i ? p : `${v}px`), { data: { x: h, y: g } };
  }
});
function $s(e) {
  const [t, o = "center"] = e.split("-");
  return [t, o];
}
var Ct = ks, St = Ms, Vt = Ds, Gt = Ls, Cn = "rovingFocusGroup.onEntryFocus", Ug = { bubbles: !1, cancelable: !0 }, Ht = "RovingFocusGroup", [Dn, zs, Kg] = Ot(Ht), [jg, Ue] = te(
  Ht,
  [Kg]
), [Yg, Xg] = jg(Ht), Fs = c.forwardRef(
  (e, t) => /* @__PURE__ */ l(Dn.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ l(Dn.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ l(qg, { ...e, ref: t }) }) })
);
Fs.displayName = Ht;
var qg = c.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: o,
    orientation: n,
    loop: r = !1,
    dir: a,
    currentTabStopId: i,
    defaultCurrentTabStopId: s,
    onCurrentTabStopIdChange: d,
    onEntryFocus: f,
    preventScrollOnEntryFocus: u = !1,
    ...p
  } = e, m = c.useRef(null), v = F(t, m), h = Le(a), [g, b] = ae({
    prop: i,
    defaultProp: s ?? null,
    onChange: d,
    caller: Ht
  }), [w, x] = c.useState(!1), y = se(f), S = zs(o), R = c.useRef(!1), [T, A] = c.useState(0);
  return c.useEffect(() => {
    const E = m.current;
    if (E)
      return E.addEventListener(Cn, y), () => E.removeEventListener(Cn, y);
  }, [y]), /* @__PURE__ */ l(
    Yg,
    {
      scope: o,
      orientation: n,
      dir: h,
      loop: r,
      currentTabStopId: g,
      onItemFocus: c.useCallback(
        (E) => b(E),
        [b]
      ),
      onItemShiftTab: c.useCallback(() => x(!0), []),
      onFocusableItemAdd: c.useCallback(
        () => A((E) => E + 1),
        []
      ),
      onFocusableItemRemove: c.useCallback(
        () => A((E) => E - 1),
        []
      ),
      children: /* @__PURE__ */ l(
        k.div,
        {
          tabIndex: w || T === 0 ? -1 : 0,
          "data-orientation": n,
          ...p,
          ref: v,
          style: { outline: "none", ...e.style },
          onMouseDown: _(e.onMouseDown, () => {
            R.current = !0;
          }),
          onFocus: _(e.onFocus, (E) => {
            const M = !R.current;
            if (E.target === E.currentTarget && M && !w) {
              const $ = new CustomEvent(Cn, Ug);
              if (E.currentTarget.dispatchEvent($), !$.defaultPrevented) {
                const z = S().filter((L) => L.focusable), V = z.find((L) => L.active), H = z.find((L) => L.id === g), U = [V, H, ...z].filter(
                  Boolean
                ).map((L) => L.ref.current);
                Gs(U, u);
              }
            }
            R.current = !1;
          }),
          onBlur: _(e.onBlur, () => x(!1))
        }
      )
    }
  );
}), Bs = "RovingFocusGroupItem", Vs = c.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: o,
      focusable: n = !0,
      active: r = !1,
      tabStopId: a,
      children: i,
      ...s
    } = e, d = de(), f = a || d, u = Xg(Bs, o), p = u.currentTabStopId === f, m = zs(o), { onFocusableItemAdd: v, onFocusableItemRemove: h, currentTabStopId: g } = u;
    return c.useEffect(() => {
      if (n)
        return v(), () => h();
    }, [n, v, h]), /* @__PURE__ */ l(
      Dn.ItemSlot,
      {
        scope: o,
        id: f,
        focusable: n,
        active: r,
        children: /* @__PURE__ */ l(
          k.span,
          {
            tabIndex: p ? 0 : -1,
            "data-orientation": u.orientation,
            ...s,
            ref: t,
            onMouseDown: _(e.onMouseDown, (b) => {
              n ? u.onItemFocus(f) : b.preventDefault();
            }),
            onFocus: _(e.onFocus, () => u.onItemFocus(f)),
            onKeyDown: _(e.onKeyDown, (b) => {
              if (b.key === "Tab" && b.shiftKey) {
                u.onItemShiftTab();
                return;
              }
              if (b.target !== b.currentTarget) return;
              const w = Jg(b, u.orientation, u.dir);
              if (w !== void 0) {
                if (b.metaKey || b.ctrlKey || b.altKey || b.shiftKey) return;
                b.preventDefault();
                let y = m().filter((S) => S.focusable).map((S) => S.ref.current);
                if (w === "last") y.reverse();
                else if (w === "prev" || w === "next") {
                  w === "prev" && y.reverse();
                  const S = y.indexOf(b.currentTarget);
                  y = u.loop ? ev(y, S + 1) : y.slice(S + 1);
                }
                setTimeout(() => Gs(y));
              }
            }),
            children: typeof i == "function" ? i({ isCurrentTabStop: p, hasTabStop: g != null }) : i
          }
        )
      }
    );
  }
);
Vs.displayName = Bs;
var Zg = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Qg(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function Jg(e, t, o) {
  const n = Qg(e.key, o);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(n)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(n)))
    return Zg[n];
}
function Gs(e, t = !1) {
  const o = document.activeElement;
  for (const n of e)
    if (n === o || (n.focus({ preventScroll: t }), document.activeElement !== o)) return;
}
function ev(e, t) {
  return e.map((o, n) => e[(t + n) % e.length]);
}
var Fo = Fs, Bo = Vs, On = ["Enter", " "], tv = ["ArrowDown", "PageUp", "Home"], Hs = ["ArrowUp", "PageDown", "End"], ov = [...tv, ...Hs], nv = {
  ltr: [...On, "ArrowRight"],
  rtl: [...On, "ArrowLeft"]
}, rv = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, Wt = "Menu", [kt, av, iv] = Ot(Wt), [it, Ws] = te(Wt, [
  iv,
  Te,
  Ue
]), Ut = Te(), Us = Ue(), [Ks, Ke] = it(Wt), [sv, Kt] = it(Wt), js = (e) => {
  const { __scopeMenu: t, open: o = !1, children: n, dir: r, onOpenChange: a, modal: i = !0 } = e, s = Ut(t), [d, f] = c.useState(null), u = c.useRef(!1), p = se(a), m = Le(r);
  return c.useEffect(() => {
    const v = () => {
      u.current = !0, document.addEventListener("pointerdown", h, { capture: !0, once: !0 }), document.addEventListener("pointermove", h, { capture: !0, once: !0 });
    }, h = () => u.current = !1;
    return document.addEventListener("keydown", v, { capture: !0 }), () => {
      document.removeEventListener("keydown", v, { capture: !0 }), document.removeEventListener("pointerdown", h, { capture: !0 }), document.removeEventListener("pointermove", h, { capture: !0 });
    };
  }, []), /* @__PURE__ */ l(Ct, { ...s, children: /* @__PURE__ */ l(
    Ks,
    {
      scope: t,
      open: o,
      onOpenChange: p,
      content: d,
      onContentChange: f,
      children: /* @__PURE__ */ l(
        sv,
        {
          scope: t,
          onClose: c.useCallback(() => p(!1), [p]),
          isUsingKeyboardRef: u,
          dir: m,
          modal: i,
          children: n
        }
      )
    }
  ) });
};
js.displayName = Wt;
var lv = "MenuAnchor", Sr = c.forwardRef(
  (e, t) => {
    const { __scopeMenu: o, ...n } = e, r = Ut(o);
    return /* @__PURE__ */ l(St, { ...r, ...n, ref: t });
  }
);
Sr.displayName = lv;
var Rr = "MenuPortal", [cv, Ys] = it(Rr, {
  forceMount: void 0
}), Xs = (e) => {
  const { __scopeMenu: t, forceMount: o, children: n, container: r } = e, a = Ke(Rr, t);
  return /* @__PURE__ */ l(cv, { scope: t, forceMount: o, children: /* @__PURE__ */ l(oe, { present: o || a.open, children: /* @__PURE__ */ l(rt, { asChild: !0, container: r, children: n }) }) });
};
Xs.displayName = Rr;
var he = "MenuContent", [dv, Er] = it(he), qs = c.forwardRef(
  (e, t) => {
    const o = Ys(he, e.__scopeMenu), { forceMount: n = o.forceMount, ...r } = e, a = Ke(he, e.__scopeMenu), i = Kt(he, e.__scopeMenu);
    return /* @__PURE__ */ l(kt.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ l(oe, { present: n || a.open, children: /* @__PURE__ */ l(kt.Slot, { scope: e.__scopeMenu, children: i.modal ? /* @__PURE__ */ l(uv, { ...r, ref: t }) : /* @__PURE__ */ l(fv, { ...r, ref: t }) }) }) });
  }
), uv = c.forwardRef(
  (e, t) => {
    const o = Ke(he, e.__scopeMenu), n = c.useRef(null), r = F(t, n);
    return c.useEffect(() => {
      const a = n.current;
      if (a) return Io(a);
    }, []), /* @__PURE__ */ l(
      Pr,
      {
        ...e,
        ref: r,
        trapFocus: o.open,
        disableOutsidePointerEvents: o.open,
        disableOutsideScroll: !0,
        onFocusOutside: _(
          e.onFocusOutside,
          (a) => a.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => o.onOpenChange(!1)
      }
    );
  }
), fv = c.forwardRef((e, t) => {
  const o = Ke(he, e.__scopeMenu);
  return /* @__PURE__ */ l(
    Pr,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => o.onOpenChange(!1)
    }
  );
}), pv = /* @__PURE__ */ Ge("MenuContent.ScrollLock"), Pr = c.forwardRef(
  (e, t) => {
    const {
      __scopeMenu: o,
      loop: n = !1,
      trapFocus: r,
      onOpenAutoFocus: a,
      onCloseAutoFocus: i,
      disableOutsidePointerEvents: s,
      onEntryFocus: d,
      onEscapeKeyDown: f,
      onPointerDownOutside: u,
      onFocusOutside: p,
      onInteractOutside: m,
      onDismiss: v,
      disableOutsideScroll: h,
      ...g
    } = e, b = Ke(he, o), w = Kt(he, o), x = Ut(o), y = Us(o), S = av(o), [R, T] = c.useState(null), A = c.useRef(null), E = F(t, A, b.onContentChange), M = c.useRef(0), $ = c.useRef(""), z = c.useRef(0), V = c.useRef(null), H = c.useRef("right"), G = c.useRef(0), U = h ? $t : c.Fragment, L = h ? { as: pv, allowPinchZoom: !0 } : void 0, B = (I) => {
      const ee = $.current + I, le = S().filter((N) => !N.disabled), fe = document.activeElement, Q = le.find((N) => N.ref.current === fe)?.textValue, Z = le.map((N) => N.textValue), pe = Ev(Z, ee, Q), ce = le.find((N) => N.textValue === pe)?.ref.current;
      (function N(X) {
        $.current = X, window.clearTimeout(M.current), X !== "" && (M.current = window.setTimeout(() => N(""), 1e3));
      })(ee), ce && setTimeout(() => ce.focus());
    };
    c.useEffect(() => () => window.clearTimeout(M.current), []), To();
    const P = c.useCallback((I) => H.current === V.current?.side && _v(I, V.current?.area), []);
    return /* @__PURE__ */ l(
      dv,
      {
        scope: o,
        searchRef: $,
        onItemEnter: c.useCallback(
          (I) => {
            P(I) && I.preventDefault();
          },
          [P]
        ),
        onItemLeave: c.useCallback(
          (I) => {
            P(I) || (A.current?.focus(), T(null));
          },
          [P]
        ),
        onTriggerLeave: c.useCallback(
          (I) => {
            P(I) && I.preventDefault();
          },
          [P]
        ),
        pointerGraceTimerRef: z,
        onPointerGraceIntentChange: c.useCallback((I) => {
          V.current = I;
        }, []),
        children: /* @__PURE__ */ l(U, { ...L, children: /* @__PURE__ */ l(
          Lt,
          {
            asChild: !0,
            trapped: r,
            onMountAutoFocus: _(a, (I) => {
              I.preventDefault(), A.current?.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: i,
            children: /* @__PURE__ */ l(
              nt,
              {
                asChild: !0,
                disableOutsidePointerEvents: s,
                onEscapeKeyDown: f,
                onPointerDownOutside: u,
                onFocusOutside: p,
                onInteractOutside: m,
                onDismiss: v,
                children: /* @__PURE__ */ l(
                  Fo,
                  {
                    asChild: !0,
                    ...y,
                    dir: w.dir,
                    orientation: "vertical",
                    loop: n,
                    currentTabStopId: R,
                    onCurrentTabStopIdChange: T,
                    onEntryFocus: _(d, (I) => {
                      w.isUsingKeyboardRef.current || I.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ l(
                      Vt,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": pl(b.open),
                        "data-radix-menu-content": "",
                        dir: w.dir,
                        ...x,
                        ...g,
                        ref: E,
                        style: { outline: "none", ...g.style },
                        onKeyDown: _(g.onKeyDown, (I) => {
                          const le = I.target.closest("[data-radix-menu-content]") === I.currentTarget, fe = I.ctrlKey || I.altKey || I.metaKey, Q = I.key.length === 1;
                          le && (I.key === "Tab" && I.preventDefault(), !fe && Q && B(I.key));
                          const Z = A.current;
                          if (I.target !== Z || !ov.includes(I.key)) return;
                          I.preventDefault();
                          const ce = S().filter((N) => !N.disabled).map((N) => N.ref.current);
                          Hs.includes(I.key) && ce.reverse(), Sv(ce);
                        }),
                        onBlur: _(e.onBlur, (I) => {
                          I.currentTarget.contains(I.target) || (window.clearTimeout(M.current), $.current = "");
                        }),
                        onPointerMove: _(
                          e.onPointerMove,
                          It((I) => {
                            const ee = I.target, le = G.current !== I.clientX;
                            if (I.currentTarget.contains(ee) && le) {
                              const fe = I.clientX > G.current ? "right" : "left";
                              H.current = fe, G.current = I.clientX;
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
qs.displayName = he;
var mv = "MenuGroup", _r = c.forwardRef(
  (e, t) => {
    const { __scopeMenu: o, ...n } = e;
    return /* @__PURE__ */ l(k.div, { role: "group", ...n, ref: t });
  }
);
_r.displayName = mv;
var gv = "MenuLabel", Zs = c.forwardRef(
  (e, t) => {
    const { __scopeMenu: o, ...n } = e;
    return /* @__PURE__ */ l(k.div, { ...n, ref: t });
  }
);
Zs.displayName = gv;
var mo = "MenuItem", Ra = "menu.itemSelect", Vo = c.forwardRef(
  (e, t) => {
    const { disabled: o = !1, onSelect: n, ...r } = e, a = c.useRef(null), i = Kt(mo, e.__scopeMenu), s = Er(mo, e.__scopeMenu), d = F(t, a), f = c.useRef(!1), u = () => {
      const p = a.current;
      if (!o && p) {
        const m = new CustomEvent(Ra, { bubbles: !0, cancelable: !0 });
        p.addEventListener(Ra, (v) => n?.(v), { once: !0 }), Za(p, m), m.defaultPrevented ? f.current = !1 : i.onClose();
      }
    };
    return /* @__PURE__ */ l(
      Qs,
      {
        ...r,
        ref: d,
        disabled: o,
        onClick: _(e.onClick, u),
        onPointerDown: (p) => {
          e.onPointerDown?.(p), f.current = !0;
        },
        onPointerUp: _(e.onPointerUp, (p) => {
          f.current || p.currentTarget?.click();
        }),
        onKeyDown: _(e.onKeyDown, (p) => {
          const m = s.searchRef.current !== "";
          o || m && p.key === " " || On.includes(p.key) && (p.currentTarget.click(), p.preventDefault());
        })
      }
    );
  }
);
Vo.displayName = mo;
var Qs = c.forwardRef(
  (e, t) => {
    const { __scopeMenu: o, disabled: n = !1, textValue: r, ...a } = e, i = Er(mo, o), s = Us(o), d = c.useRef(null), f = F(t, d), [u, p] = c.useState(!1), [m, v] = c.useState("");
    return c.useEffect(() => {
      const h = d.current;
      h && v((h.textContent ?? "").trim());
    }, [a.children]), /* @__PURE__ */ l(
      kt.ItemSlot,
      {
        scope: o,
        disabled: n,
        textValue: r ?? m,
        children: /* @__PURE__ */ l(Bo, { asChild: !0, ...s, focusable: !n, children: /* @__PURE__ */ l(
          k.div,
          {
            role: "menuitem",
            "data-highlighted": u ? "" : void 0,
            "aria-disabled": n || void 0,
            "data-disabled": n ? "" : void 0,
            ...a,
            ref: f,
            onPointerMove: _(
              e.onPointerMove,
              It((h) => {
                n ? i.onItemLeave(h) : (i.onItemEnter(h), h.defaultPrevented || h.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: _(
              e.onPointerLeave,
              It((h) => i.onItemLeave(h))
            ),
            onFocus: _(e.onFocus, () => p(!0)),
            onBlur: _(e.onBlur, () => p(!1))
          }
        ) })
      }
    );
  }
), vv = "MenuCheckboxItem", Js = c.forwardRef(
  (e, t) => {
    const { checked: o = !1, onCheckedChange: n, ...r } = e;
    return /* @__PURE__ */ l(rl, { scope: e.__scopeMenu, checked: o, children: /* @__PURE__ */ l(
      Vo,
      {
        role: "menuitemcheckbox",
        "aria-checked": go(o) ? "mixed" : o,
        ...r,
        ref: t,
        "data-state": Tr(o),
        onSelect: _(
          r.onSelect,
          () => n?.(go(o) ? !0 : !o),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Js.displayName = vv;
var el = "MenuRadioGroup", [hv, bv] = it(
  el,
  { value: void 0, onValueChange: () => {
  } }
), tl = c.forwardRef(
  (e, t) => {
    const { value: o, onValueChange: n, ...r } = e, a = se(n);
    return /* @__PURE__ */ l(hv, { scope: e.__scopeMenu, value: o, onValueChange: a, children: /* @__PURE__ */ l(_r, { ...r, ref: t }) });
  }
);
tl.displayName = el;
var ol = "MenuRadioItem", nl = c.forwardRef(
  (e, t) => {
    const { value: o, ...n } = e, r = bv(ol, e.__scopeMenu), a = o === r.value;
    return /* @__PURE__ */ l(rl, { scope: e.__scopeMenu, checked: a, children: /* @__PURE__ */ l(
      Vo,
      {
        role: "menuitemradio",
        "aria-checked": a,
        ...n,
        ref: t,
        "data-state": Tr(a),
        onSelect: _(
          n.onSelect,
          () => r.onValueChange?.(o),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
nl.displayName = ol;
var Ar = "MenuItemIndicator", [rl, wv] = it(
  Ar,
  { checked: !1 }
), al = c.forwardRef(
  (e, t) => {
    const { __scopeMenu: o, forceMount: n, ...r } = e, a = wv(Ar, o);
    return /* @__PURE__ */ l(
      oe,
      {
        present: n || go(a.checked) || a.checked === !0,
        children: /* @__PURE__ */ l(
          k.span,
          {
            ...r,
            ref: t,
            "data-state": Tr(a.checked)
          }
        )
      }
    );
  }
);
al.displayName = Ar;
var xv = "MenuSeparator", il = c.forwardRef(
  (e, t) => {
    const { __scopeMenu: o, ...n } = e;
    return /* @__PURE__ */ l(
      k.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...n,
        ref: t
      }
    );
  }
);
il.displayName = xv;
var yv = "MenuArrow", sl = c.forwardRef(
  (e, t) => {
    const { __scopeMenu: o, ...n } = e, r = Ut(o);
    return /* @__PURE__ */ l(Gt, { ...r, ...n, ref: t });
  }
);
sl.displayName = yv;
var Nr = "MenuSub", [Cv, ll] = it(Nr), cl = (e) => {
  const { __scopeMenu: t, children: o, open: n = !1, onOpenChange: r } = e, a = Ke(Nr, t), i = Ut(t), [s, d] = c.useState(null), [f, u] = c.useState(null), p = se(r);
  return c.useEffect(() => (a.open === !1 && p(!1), () => p(!1)), [a.open, p]), /* @__PURE__ */ l(Ct, { ...i, children: /* @__PURE__ */ l(
    Ks,
    {
      scope: t,
      open: n,
      onOpenChange: p,
      content: f,
      onContentChange: u,
      children: /* @__PURE__ */ l(
        Cv,
        {
          scope: t,
          contentId: de(),
          triggerId: de(),
          trigger: s,
          onTriggerChange: d,
          children: o
        }
      )
    }
  ) });
};
cl.displayName = Nr;
var _t = "MenuSubTrigger", dl = c.forwardRef(
  (e, t) => {
    const o = Ke(_t, e.__scopeMenu), n = Kt(_t, e.__scopeMenu), r = ll(_t, e.__scopeMenu), a = Er(_t, e.__scopeMenu), i = c.useRef(null), { pointerGraceTimerRef: s, onPointerGraceIntentChange: d } = a, f = { __scopeMenu: e.__scopeMenu }, u = c.useCallback(() => {
      i.current && window.clearTimeout(i.current), i.current = null;
    }, []);
    return c.useEffect(() => u, [u]), c.useEffect(() => {
      const p = s.current;
      return () => {
        window.clearTimeout(p), d(null);
      };
    }, [s, d]), /* @__PURE__ */ l(Sr, { asChild: !0, ...f, children: /* @__PURE__ */ l(
      Qs,
      {
        id: r.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": o.open,
        "aria-controls": r.contentId,
        "data-state": pl(o.open),
        ...e,
        ref: Eo(t, r.onTriggerChange),
        onClick: (p) => {
          e.onClick?.(p), !(e.disabled || p.defaultPrevented) && (p.currentTarget.focus(), o.open || o.onOpenChange(!0));
        },
        onPointerMove: _(
          e.onPointerMove,
          It((p) => {
            a.onItemEnter(p), !p.defaultPrevented && !e.disabled && !o.open && !i.current && (a.onPointerGraceIntentChange(null), i.current = window.setTimeout(() => {
              o.onOpenChange(!0), u();
            }, 100));
          })
        ),
        onPointerLeave: _(
          e.onPointerLeave,
          It((p) => {
            u();
            const m = o.content?.getBoundingClientRect();
            if (m) {
              const v = o.content?.dataset.side, h = v === "right", g = h ? -5 : 5, b = m[h ? "left" : "right"], w = m[h ? "right" : "left"];
              a.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: p.clientX + g, y: p.clientY },
                  { x: b, y: m.top },
                  { x: w, y: m.top },
                  { x: w, y: m.bottom },
                  { x: b, y: m.bottom }
                ],
                side: v
              }), window.clearTimeout(s.current), s.current = window.setTimeout(
                () => a.onPointerGraceIntentChange(null),
                300
              );
            } else {
              if (a.onTriggerLeave(p), p.defaultPrevented) return;
              a.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: _(e.onKeyDown, (p) => {
          const m = a.searchRef.current !== "";
          e.disabled || m && p.key === " " || nv[n.dir].includes(p.key) && (o.onOpenChange(!0), o.content?.focus(), p.preventDefault());
        })
      }
    ) });
  }
);
dl.displayName = _t;
var ul = "MenuSubContent", fl = c.forwardRef(
  (e, t) => {
    const o = Ys(he, e.__scopeMenu), { forceMount: n = o.forceMount, ...r } = e, a = Ke(he, e.__scopeMenu), i = Kt(he, e.__scopeMenu), s = ll(ul, e.__scopeMenu), d = c.useRef(null), f = F(t, d);
    return /* @__PURE__ */ l(kt.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ l(oe, { present: n || a.open, children: /* @__PURE__ */ l(kt.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ l(
      Pr,
      {
        id: s.contentId,
        "aria-labelledby": s.triggerId,
        ...r,
        ref: f,
        align: "start",
        side: i.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        trapFocus: !1,
        onOpenAutoFocus: (u) => {
          i.isUsingKeyboardRef.current && d.current?.focus(), u.preventDefault();
        },
        onCloseAutoFocus: (u) => u.preventDefault(),
        onFocusOutside: _(e.onFocusOutside, (u) => {
          u.target !== s.trigger && a.onOpenChange(!1);
        }),
        onEscapeKeyDown: _(e.onEscapeKeyDown, (u) => {
          i.onClose(), u.preventDefault();
        }),
        onKeyDown: _(e.onKeyDown, (u) => {
          const p = u.currentTarget.contains(u.target), m = rv[i.dir].includes(u.key);
          p && m && (a.onOpenChange(!1), s.trigger?.focus(), u.preventDefault());
        })
      }
    ) }) }) });
  }
);
fl.displayName = ul;
function pl(e) {
  return e ? "open" : "closed";
}
function go(e) {
  return e === "indeterminate";
}
function Tr(e) {
  return go(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function Sv(e) {
  const t = document.activeElement;
  for (const o of e)
    if (o === t || (o.focus(), document.activeElement !== t)) return;
}
function Rv(e, t) {
  return e.map((o, n) => e[(t + n) % e.length]);
}
function Ev(e, t, o) {
  const r = t.length > 1 && Array.from(t).every((f) => f === t[0]) ? t[0] : t, a = o ? e.indexOf(o) : -1;
  let i = Rv(e, Math.max(a, 0));
  r.length === 1 && (i = i.filter((f) => f !== o));
  const d = i.find(
    (f) => f.toLowerCase().startsWith(r.toLowerCase())
  );
  return d !== o ? d : void 0;
}
function Pv(e, t) {
  const { x: o, y: n } = e;
  let r = !1;
  for (let a = 0, i = t.length - 1; a < t.length; i = a++) {
    const s = t[a], d = t[i], f = s.x, u = s.y, p = d.x, m = d.y;
    u > n != m > n && o < (p - f) * (n - u) / (m - u) + f && (r = !r);
  }
  return r;
}
function _v(e, t) {
  if (!t) return !1;
  const o = { x: e.clientX, y: e.clientY };
  return Pv(o, t);
}
function It(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var Av = js, Nv = Sr, Tv = Xs, kv = qs, Iv = _r, Mv = Zs, Dv = Vo, Ov = Js, Lv = tl, $v = nl, zv = al, Fv = il, Bv = sl, Vv = cl, Gv = dl, Hv = fl, Go = "DropdownMenu", [Wv, Ux] = te(
  Go,
  [Ws]
), ue = Ws(), [Uv, ml] = Wv(Go), gl = (e) => {
  const {
    __scopeDropdownMenu: t,
    children: o,
    dir: n,
    open: r,
    defaultOpen: a,
    onOpenChange: i,
    modal: s = !0
  } = e, d = ue(t), f = c.useRef(null), [u, p] = ae({
    prop: r,
    defaultProp: a ?? !1,
    onChange: i,
    caller: Go
  });
  return /* @__PURE__ */ l(
    Uv,
    {
      scope: t,
      triggerId: de(),
      triggerRef: f,
      contentId: de(),
      open: u,
      onOpenChange: p,
      onOpenToggle: c.useCallback(() => p((m) => !m), [p]),
      modal: s,
      children: /* @__PURE__ */ l(Av, { ...d, open: u, onOpenChange: p, dir: n, modal: s, children: o })
    }
  );
};
gl.displayName = Go;
var vl = "DropdownMenuTrigger", hl = c.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: o, disabled: n = !1, ...r } = e, a = ml(vl, o), i = ue(o);
    return /* @__PURE__ */ l(Nv, { asChild: !0, ...i, children: /* @__PURE__ */ l(
      k.button,
      {
        type: "button",
        id: a.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": a.open,
        "aria-controls": a.open ? a.contentId : void 0,
        "data-state": a.open ? "open" : "closed",
        "data-disabled": n ? "" : void 0,
        disabled: n,
        ...r,
        ref: Eo(t, a.triggerRef),
        onPointerDown: _(e.onPointerDown, (s) => {
          !n && s.button === 0 && s.ctrlKey === !1 && (a.onOpenToggle(), a.open || s.preventDefault());
        }),
        onKeyDown: _(e.onKeyDown, (s) => {
          n || (["Enter", " "].includes(s.key) && a.onOpenToggle(), s.key === "ArrowDown" && a.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(s.key) && s.preventDefault());
        })
      }
    ) });
  }
);
hl.displayName = vl;
var Kv = "DropdownMenuPortal", bl = (e) => {
  const { __scopeDropdownMenu: t, ...o } = e, n = ue(t);
  return /* @__PURE__ */ l(Tv, { ...n, ...o });
};
bl.displayName = Kv;
var wl = "DropdownMenuContent", xl = c.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: o, ...n } = e, r = ml(wl, o), a = ue(o), i = c.useRef(!1);
    return /* @__PURE__ */ l(
      kv,
      {
        id: r.contentId,
        "aria-labelledby": r.triggerId,
        ...a,
        ...n,
        ref: t,
        onCloseAutoFocus: _(e.onCloseAutoFocus, (s) => {
          i.current || r.triggerRef.current?.focus(), i.current = !1, s.preventDefault();
        }),
        onInteractOutside: _(e.onInteractOutside, (s) => {
          const d = s.detail.originalEvent, f = d.button === 0 && d.ctrlKey === !0, u = d.button === 2 || f;
          (!r.modal || u) && (i.current = !0);
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
xl.displayName = wl;
var jv = "DropdownMenuGroup", yl = c.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: o, ...n } = e, r = ue(o);
    return /* @__PURE__ */ l(Iv, { ...r, ...n, ref: t });
  }
);
yl.displayName = jv;
var Yv = "DropdownMenuLabel", Cl = c.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: o, ...n } = e, r = ue(o);
    return /* @__PURE__ */ l(Mv, { ...r, ...n, ref: t });
  }
);
Cl.displayName = Yv;
var Xv = "DropdownMenuItem", Sl = c.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: o, ...n } = e, r = ue(o);
    return /* @__PURE__ */ l(Dv, { ...r, ...n, ref: t });
  }
);
Sl.displayName = Xv;
var qv = "DropdownMenuCheckboxItem", Rl = c.forwardRef((e, t) => {
  const { __scopeDropdownMenu: o, ...n } = e, r = ue(o);
  return /* @__PURE__ */ l(Ov, { ...r, ...n, ref: t });
});
Rl.displayName = qv;
var Zv = "DropdownMenuRadioGroup", El = c.forwardRef((e, t) => {
  const { __scopeDropdownMenu: o, ...n } = e, r = ue(o);
  return /* @__PURE__ */ l(Lv, { ...r, ...n, ref: t });
});
El.displayName = Zv;
var Qv = "DropdownMenuRadioItem", Pl = c.forwardRef((e, t) => {
  const { __scopeDropdownMenu: o, ...n } = e, r = ue(o);
  return /* @__PURE__ */ l($v, { ...r, ...n, ref: t });
});
Pl.displayName = Qv;
var Jv = "DropdownMenuItemIndicator", _l = c.forwardRef((e, t) => {
  const { __scopeDropdownMenu: o, ...n } = e, r = ue(o);
  return /* @__PURE__ */ l(zv, { ...r, ...n, ref: t });
});
_l.displayName = Jv;
var eh = "DropdownMenuSeparator", Al = c.forwardRef((e, t) => {
  const { __scopeDropdownMenu: o, ...n } = e, r = ue(o);
  return /* @__PURE__ */ l(Fv, { ...r, ...n, ref: t });
});
Al.displayName = eh;
var th = "DropdownMenuArrow", oh = c.forwardRef(
  (e, t) => {
    const { __scopeDropdownMenu: o, ...n } = e, r = ue(o);
    return /* @__PURE__ */ l(Bv, { ...r, ...n, ref: t });
  }
);
oh.displayName = th;
var nh = (e) => {
  const { __scopeDropdownMenu: t, children: o, open: n, onOpenChange: r, defaultOpen: a } = e, i = ue(t), [s, d] = ae({
    prop: n,
    defaultProp: a ?? !1,
    onChange: r,
    caller: "DropdownMenuSub"
  });
  return /* @__PURE__ */ l(Vv, { ...i, open: s, onOpenChange: d, children: o });
}, rh = "DropdownMenuSubTrigger", Nl = c.forwardRef((e, t) => {
  const { __scopeDropdownMenu: o, ...n } = e, r = ue(o);
  return /* @__PURE__ */ l(Gv, { ...r, ...n, ref: t });
});
Nl.displayName = rh;
var ah = "DropdownMenuSubContent", Tl = c.forwardRef((e, t) => {
  const { __scopeDropdownMenu: o, ...n } = e, r = ue(o);
  return /* @__PURE__ */ l(
    Hv,
    {
      ...r,
      ...n,
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
Tl.displayName = ah;
var ih = gl, sh = hl, kl = bl, lh = xl, ch = yl, dh = Cl, uh = Sl, fh = Rl, ph = El, mh = Pl, Il = _l, gh = Al, vh = nh, hh = Nl, bh = Tl, wh = "Label", Ml = c.forwardRef((e, t) => /* @__PURE__ */ l(
  k.label,
  {
    ...e,
    ref: t,
    onMouseDown: (o) => {
      o.target.closest("button, input, select, textarea") || (e.onMouseDown?.(o), !o.defaultPrevented && o.detail > 1 && o.preventDefault());
    }
  }
));
Ml.displayName = wh;
var xh = Ml, Sn, Ho = "HoverCard", [Dl, Kx] = te(Ho, [
  Te
]), Wo = Te(), [yh, Uo] = Dl(Ho), Ol = (e) => {
  const {
    __scopeHoverCard: t,
    children: o,
    open: n,
    defaultOpen: r,
    onOpenChange: a,
    openDelay: i = 700,
    closeDelay: s = 300
  } = e, d = Wo(t), f = c.useRef(0), u = c.useRef(0), p = c.useRef(!1), m = c.useRef(!1), [v, h] = ae({
    prop: n,
    defaultProp: r ?? !1,
    onChange: a,
    caller: Ho
  }), g = c.useCallback(() => {
    clearTimeout(u.current), f.current = window.setTimeout(() => h(!0), i);
  }, [i, h]), b = c.useCallback(() => {
    clearTimeout(f.current), !p.current && !m.current && (u.current = window.setTimeout(() => h(!1), s));
  }, [s, h]), w = c.useCallback(() => h(!1), [h]);
  return c.useEffect(() => () => {
    clearTimeout(f.current), clearTimeout(u.current);
  }, []), /* @__PURE__ */ l(
    yh,
    {
      scope: t,
      open: v,
      onOpenChange: h,
      onOpen: g,
      onClose: b,
      onDismiss: w,
      hasSelectionRef: p,
      isPointerDownOnContentRef: m,
      children: /* @__PURE__ */ l(Ct, { ...d, children: o })
    }
  );
};
Ol.displayName = Ho;
var Ll = "HoverCardTrigger", $l = c.forwardRef(
  (e, t) => {
    const { __scopeHoverCard: o, ...n } = e, r = Uo(Ll, o), a = Wo(o);
    return /* @__PURE__ */ l(St, { asChild: !0, ...a, children: /* @__PURE__ */ l(
      k.a,
      {
        "data-state": r.open ? "open" : "closed",
        ...n,
        ref: t,
        onPointerEnter: _(e.onPointerEnter, ho(r.onOpen)),
        onPointerLeave: _(e.onPointerLeave, ho(r.onClose)),
        onFocus: _(e.onFocus, r.onOpen),
        onBlur: _(e.onBlur, r.onClose),
        onTouchStart: _(e.onTouchStart, (i) => i.preventDefault())
      }
    ) });
  }
);
$l.displayName = Ll;
var kr = "HoverCardPortal", [Ch, Sh] = Dl(kr, {
  forceMount: void 0
}), zl = (e) => {
  const { __scopeHoverCard: t, forceMount: o, children: n, container: r } = e, a = Uo(kr, t);
  return /* @__PURE__ */ l(Ch, { scope: t, forceMount: o, children: /* @__PURE__ */ l(oe, { present: o || a.open, children: /* @__PURE__ */ l(rt, { asChild: !0, container: r, children: n }) }) });
};
zl.displayName = kr;
var vo = "HoverCardContent", Fl = c.forwardRef(
  (e, t) => {
    const o = Sh(vo, e.__scopeHoverCard), { forceMount: n = o.forceMount, ...r } = e, a = Uo(vo, e.__scopeHoverCard);
    return /* @__PURE__ */ l(oe, { present: n || a.open, children: /* @__PURE__ */ l(
      Rh,
      {
        "data-state": a.open ? "open" : "closed",
        ...r,
        onPointerEnter: _(e.onPointerEnter, ho(a.onOpen)),
        onPointerLeave: _(e.onPointerLeave, ho(a.onClose)),
        ref: t
      }
    ) });
  }
);
Fl.displayName = vo;
var Rh = c.forwardRef((e, t) => {
  const {
    __scopeHoverCard: o,
    onEscapeKeyDown: n,
    onPointerDownOutside: r,
    onFocusOutside: a,
    onInteractOutside: i,
    ...s
  } = e, d = Uo(vo, o), f = Wo(o), u = c.useRef(null), p = F(t, u), [m, v] = c.useState(!1);
  return c.useEffect(() => {
    if (m) {
      const h = document.body;
      return Sn = h.style.userSelect || h.style.webkitUserSelect, h.style.userSelect = "none", h.style.webkitUserSelect = "none", () => {
        h.style.userSelect = Sn, h.style.webkitUserSelect = Sn;
      };
    }
  }, [m]), c.useEffect(() => {
    if (u.current) {
      const h = () => {
        v(!1), d.isPointerDownOnContentRef.current = !1, setTimeout(() => {
          document.getSelection()?.toString() !== "" && (d.hasSelectionRef.current = !0);
        });
      };
      return document.addEventListener("pointerup", h), () => {
        document.removeEventListener("pointerup", h), d.hasSelectionRef.current = !1, d.isPointerDownOnContentRef.current = !1;
      };
    }
  }, [d.isPointerDownOnContentRef, d.hasSelectionRef]), c.useEffect(() => {
    u.current && _h(u.current).forEach((g) => g.setAttribute("tabindex", "-1"));
  }), /* @__PURE__ */ l(
    nt,
    {
      asChild: !0,
      disableOutsidePointerEvents: !1,
      onInteractOutside: i,
      onEscapeKeyDown: n,
      onPointerDownOutside: r,
      onFocusOutside: _(a, (h) => {
        h.preventDefault();
      }),
      onDismiss: d.onDismiss,
      children: /* @__PURE__ */ l(
        Vt,
        {
          ...f,
          ...s,
          onPointerDown: _(s.onPointerDown, (h) => {
            h.currentTarget.contains(h.target) && v(!0), d.hasSelectionRef.current = !1, d.isPointerDownOnContentRef.current = !0;
          }),
          ref: p,
          style: {
            ...s.style,
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
}), Eh = "HoverCardArrow", Ph = c.forwardRef(
  (e, t) => {
    const { __scopeHoverCard: o, ...n } = e, r = Wo(o);
    return /* @__PURE__ */ l(Gt, { ...r, ...n, ref: t });
  }
);
Ph.displayName = Eh;
function ho(e) {
  return (t) => t.pointerType === "touch" ? void 0 : e();
}
function _h(e) {
  const t = [], o = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => n.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
  });
  for (; o.nextNode(); ) t.push(o.currentNode);
  return t;
}
var Ah = Ol, Nh = $l, Th = zl, kh = Fl;
function Mt(e, [t, o]) {
  return Math.min(o, Math.max(t, e));
}
var Ko = "Popover", [Bl, jx] = te(Ko, [
  Te
]), jt = Te(), [Ih, je] = Bl(Ko), Vl = (e) => {
  const {
    __scopePopover: t,
    children: o,
    open: n,
    defaultOpen: r,
    onOpenChange: a,
    modal: i = !1
  } = e, s = jt(t), d = c.useRef(null), [f, u] = c.useState(!1), [p, m] = ae({
    prop: n,
    defaultProp: r ?? !1,
    onChange: a,
    caller: Ko
  });
  return /* @__PURE__ */ l(Ct, { ...s, children: /* @__PURE__ */ l(
    Ih,
    {
      scope: t,
      contentId: de(),
      triggerRef: d,
      open: p,
      onOpenChange: m,
      onOpenToggle: c.useCallback(() => m((v) => !v), [m]),
      hasCustomAnchor: f,
      onCustomAnchorAdd: c.useCallback(() => u(!0), []),
      onCustomAnchorRemove: c.useCallback(() => u(!1), []),
      modal: i,
      children: o
    }
  ) });
};
Vl.displayName = Ko;
var Gl = "PopoverAnchor", Mh = c.forwardRef(
  (e, t) => {
    const { __scopePopover: o, ...n } = e, r = je(Gl, o), a = jt(o), { onCustomAnchorAdd: i, onCustomAnchorRemove: s } = r;
    return c.useEffect(() => (i(), () => s()), [i, s]), /* @__PURE__ */ l(St, { ...a, ...n, ref: t });
  }
);
Mh.displayName = Gl;
var Hl = "PopoverTrigger", Wl = c.forwardRef(
  (e, t) => {
    const { __scopePopover: o, ...n } = e, r = je(Hl, o), a = jt(o), i = F(t, r.triggerRef), s = /* @__PURE__ */ l(
      k.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": r.open,
        "aria-controls": r.contentId,
        "data-state": Xl(r.open),
        ...n,
        ref: i,
        onClick: _(e.onClick, r.onOpenToggle)
      }
    );
    return r.hasCustomAnchor ? s : /* @__PURE__ */ l(St, { asChild: !0, ...a, children: s });
  }
);
Wl.displayName = Hl;
var Ir = "PopoverPortal", [Dh, Oh] = Bl(Ir, {
  forceMount: void 0
}), Ul = (e) => {
  const { __scopePopover: t, forceMount: o, children: n, container: r } = e, a = je(Ir, t);
  return /* @__PURE__ */ l(Dh, { scope: t, forceMount: o, children: /* @__PURE__ */ l(oe, { present: o || a.open, children: /* @__PURE__ */ l(rt, { asChild: !0, container: r, children: n }) }) });
};
Ul.displayName = Ir;
var gt = "PopoverContent", Kl = c.forwardRef(
  (e, t) => {
    const o = Oh(gt, e.__scopePopover), { forceMount: n = o.forceMount, ...r } = e, a = je(gt, e.__scopePopover);
    return /* @__PURE__ */ l(oe, { present: n || a.open, children: a.modal ? /* @__PURE__ */ l($h, { ...r, ref: t }) : /* @__PURE__ */ l(zh, { ...r, ref: t }) });
  }
);
Kl.displayName = gt;
var Lh = /* @__PURE__ */ Ge("PopoverContent.RemoveScroll"), $h = c.forwardRef(
  (e, t) => {
    const o = je(gt, e.__scopePopover), n = c.useRef(null), r = F(t, n), a = c.useRef(!1);
    return c.useEffect(() => {
      const i = n.current;
      if (i) return Io(i);
    }, []), /* @__PURE__ */ l($t, { as: Lh, allowPinchZoom: !0, children: /* @__PURE__ */ l(
      jl,
      {
        ...e,
        ref: r,
        trapFocus: o.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: _(e.onCloseAutoFocus, (i) => {
          i.preventDefault(), a.current || o.triggerRef.current?.focus();
        }),
        onPointerDownOutside: _(
          e.onPointerDownOutside,
          (i) => {
            const s = i.detail.originalEvent, d = s.button === 0 && s.ctrlKey === !0, f = s.button === 2 || d;
            a.current = f;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: _(
          e.onFocusOutside,
          (i) => i.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), zh = c.forwardRef(
  (e, t) => {
    const o = je(gt, e.__scopePopover), n = c.useRef(!1), r = c.useRef(!1);
    return /* @__PURE__ */ l(
      jl,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (a) => {
          e.onCloseAutoFocus?.(a), a.defaultPrevented || (n.current || o.triggerRef.current?.focus(), a.preventDefault()), n.current = !1, r.current = !1;
        },
        onInteractOutside: (a) => {
          e.onInteractOutside?.(a), a.defaultPrevented || (n.current = !0, a.detail.originalEvent.type === "pointerdown" && (r.current = !0));
          const i = a.target;
          o.triggerRef.current?.contains(i) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && r.current && a.preventDefault();
        }
      }
    );
  }
), jl = c.forwardRef(
  (e, t) => {
    const {
      __scopePopover: o,
      trapFocus: n,
      onOpenAutoFocus: r,
      onCloseAutoFocus: a,
      disableOutsidePointerEvents: i,
      onEscapeKeyDown: s,
      onPointerDownOutside: d,
      onFocusOutside: f,
      onInteractOutside: u,
      ...p
    } = e, m = je(gt, o), v = jt(o);
    return To(), /* @__PURE__ */ l(
      Lt,
      {
        asChild: !0,
        loop: !0,
        trapped: n,
        onMountAutoFocus: r,
        onUnmountAutoFocus: a,
        children: /* @__PURE__ */ l(
          nt,
          {
            asChild: !0,
            disableOutsidePointerEvents: i,
            onInteractOutside: u,
            onEscapeKeyDown: s,
            onPointerDownOutside: d,
            onFocusOutside: f,
            onDismiss: () => m.onOpenChange(!1),
            children: /* @__PURE__ */ l(
              Vt,
              {
                "data-state": Xl(m.open),
                role: "dialog",
                id: m.contentId,
                ...v,
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
), Yl = "PopoverClose", Fh = c.forwardRef(
  (e, t) => {
    const { __scopePopover: o, ...n } = e, r = je(Yl, o);
    return /* @__PURE__ */ l(
      k.button,
      {
        type: "button",
        ...n,
        ref: t,
        onClick: _(e.onClick, () => r.onOpenChange(!1))
      }
    );
  }
);
Fh.displayName = Yl;
var Bh = "PopoverArrow", Vh = c.forwardRef(
  (e, t) => {
    const { __scopePopover: o, ...n } = e, r = jt(o);
    return /* @__PURE__ */ l(Gt, { ...r, ...n, ref: t });
  }
);
Vh.displayName = Bh;
function Xl(e) {
  return e ? "open" : "closed";
}
var Gh = Vl, Hh = Wl, Wh = Ul, Uh = Kl, Mr = "Progress", Dr = 100, [Kh, Yx] = te(Mr), [jh, Yh] = Kh(Mr), ql = c.forwardRef(
  (e, t) => {
    const {
      __scopeProgress: o,
      value: n = null,
      max: r,
      getValueLabel: a = Xh,
      ...i
    } = e;
    (r || r === 0) && !Ea(r) && console.error(qh(`${r}`, "Progress"));
    const s = Ea(r) ? r : Dr;
    n !== null && !Pa(n, s) && console.error(Zh(`${n}`, "Progress"));
    const d = Pa(n, s) ? n : null, f = bo(d) ? a(d, s) : void 0;
    return /* @__PURE__ */ l(jh, { scope: o, value: d, max: s, children: /* @__PURE__ */ l(
      k.div,
      {
        "aria-valuemax": s,
        "aria-valuemin": 0,
        "aria-valuenow": bo(d) ? d : void 0,
        "aria-valuetext": f,
        role: "progressbar",
        "data-state": Jl(d, s),
        "data-value": d ?? void 0,
        "data-max": s,
        ...i,
        ref: t
      }
    ) });
  }
);
ql.displayName = Mr;
var Zl = "ProgressIndicator", Ql = c.forwardRef(
  (e, t) => {
    const { __scopeProgress: o, ...n } = e, r = Yh(Zl, o);
    return /* @__PURE__ */ l(
      k.div,
      {
        "data-state": Jl(r.value, r.max),
        "data-value": r.value ?? void 0,
        "data-max": r.max,
        ...n,
        ref: t
      }
    );
  }
);
Ql.displayName = Zl;
function Xh(e, t) {
  return `${Math.round(e / t * 100)}%`;
}
function Jl(e, t) {
  return e == null ? "indeterminate" : e === t ? "complete" : "loading";
}
function bo(e) {
  return typeof e == "number";
}
function Ea(e) {
  return bo(e) && !isNaN(e) && e > 0;
}
function Pa(e, t) {
  return bo(e) && !isNaN(e) && e <= t && e >= 0;
}
function qh(e, t) {
  return `Invalid prop \`max\` of value \`${e}\` supplied to \`${t}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${Dr}\`.`;
}
function Zh(e, t) {
  return `Invalid prop \`value\` of value \`${e}\` supplied to \`${t}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${Dr} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Qh = ql, Jh = Ql, Or = "Radio", [eb, ec] = te(Or), [tb, ob] = eb(Or), tc = c.forwardRef(
  (e, t) => {
    const {
      __scopeRadio: o,
      name: n,
      checked: r = !1,
      required: a,
      disabled: i,
      value: s = "on",
      onCheck: d,
      form: f,
      ...u
    } = e, [p, m] = c.useState(null), v = F(t, (b) => m(b)), h = c.useRef(!1), g = p ? f || !!p.closest("form") : !0;
    return /* @__PURE__ */ K(tb, { scope: o, checked: r, disabled: i, children: [
      /* @__PURE__ */ l(
        k.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": r,
          "data-state": ac(r),
          "data-disabled": i ? "" : void 0,
          disabled: i,
          value: s,
          ...u,
          ref: v,
          onClick: _(e.onClick, (b) => {
            r || d?.(), g && (h.current = b.isPropagationStopped(), h.current || b.stopPropagation());
          })
        }
      ),
      g && /* @__PURE__ */ l(
        rc,
        {
          control: p,
          bubbles: !h.current,
          name: n,
          value: s,
          checked: r,
          required: a,
          disabled: i,
          form: f,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
tc.displayName = Or;
var oc = "RadioIndicator", nc = c.forwardRef(
  (e, t) => {
    const { __scopeRadio: o, forceMount: n, ...r } = e, a = ob(oc, o);
    return /* @__PURE__ */ l(oe, { present: n || a.checked, children: /* @__PURE__ */ l(
      k.span,
      {
        "data-state": ac(a.checked),
        "data-disabled": a.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    ) });
  }
);
nc.displayName = oc;
var nb = "RadioBubbleInput", rc = c.forwardRef(
  ({
    __scopeRadio: e,
    control: t,
    checked: o,
    bubbles: n = !0,
    ...r
  }, a) => {
    const i = c.useRef(null), s = F(i, a), d = zt(o), f = Ft(t);
    return c.useEffect(() => {
      const u = i.current;
      if (!u) return;
      const p = window.HTMLInputElement.prototype, v = Object.getOwnPropertyDescriptor(
        p,
        "checked"
      ).set;
      if (d !== o && v) {
        const h = new Event("click", { bubbles: n });
        v.call(u, o), u.dispatchEvent(h);
      }
    }, [d, o, n]), /* @__PURE__ */ l(
      k.input,
      {
        type: "radio",
        "aria-hidden": !0,
        defaultChecked: o,
        ...r,
        tabIndex: -1,
        ref: s,
        style: {
          ...r.style,
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
rc.displayName = nb;
function ac(e) {
  return e ? "checked" : "unchecked";
}
var rb = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], jo = "RadioGroup", [ab, Xx] = te(jo, [
  Ue,
  ec
]), ic = Ue(), sc = ec(), [ib, sb] = ab(jo), lc = c.forwardRef(
  (e, t) => {
    const {
      __scopeRadioGroup: o,
      name: n,
      defaultValue: r,
      value: a,
      required: i = !1,
      disabled: s = !1,
      orientation: d,
      dir: f,
      loop: u = !0,
      onValueChange: p,
      ...m
    } = e, v = ic(o), h = Le(f), [g, b] = ae({
      prop: a,
      defaultProp: r ?? null,
      onChange: p,
      caller: jo
    });
    return /* @__PURE__ */ l(
      ib,
      {
        scope: o,
        name: n,
        required: i,
        disabled: s,
        value: g,
        onValueChange: b,
        children: /* @__PURE__ */ l(
          Fo,
          {
            asChild: !0,
            ...v,
            orientation: d,
            dir: h,
            loop: u,
            children: /* @__PURE__ */ l(
              k.div,
              {
                role: "radiogroup",
                "aria-required": i,
                "aria-orientation": d,
                "data-disabled": s ? "" : void 0,
                dir: h,
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
lc.displayName = jo;
var cc = "RadioGroupItem", dc = c.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: o, disabled: n, ...r } = e, a = sb(cc, o), i = a.disabled || n, s = ic(o), d = sc(o), f = c.useRef(null), u = F(t, f), p = a.value === r.value, m = c.useRef(!1);
    return c.useEffect(() => {
      const v = (g) => {
        rb.includes(g.key) && (m.current = !0);
      }, h = () => m.current = !1;
      return document.addEventListener("keydown", v), document.addEventListener("keyup", h), () => {
        document.removeEventListener("keydown", v), document.removeEventListener("keyup", h);
      };
    }, []), /* @__PURE__ */ l(
      Bo,
      {
        asChild: !0,
        ...s,
        focusable: !i,
        active: p,
        children: /* @__PURE__ */ l(
          tc,
          {
            disabled: i,
            required: a.required,
            checked: p,
            ...d,
            ...r,
            name: a.name,
            ref: u,
            onCheck: () => a.onValueChange(r.value),
            onKeyDown: _((v) => {
              v.key === "Enter" && v.preventDefault();
            }),
            onFocus: _(r.onFocus, () => {
              m.current && f.current?.click();
            })
          }
        )
      }
    );
  }
);
dc.displayName = cc;
var lb = "RadioGroupIndicator", uc = c.forwardRef(
  (e, t) => {
    const { __scopeRadioGroup: o, ...n } = e, r = sc(o);
    return /* @__PURE__ */ l(nc, { ...r, ...n, ref: t });
  }
);
uc.displayName = lb;
var cb = lc, db = dc, ub = uc;
function fb(e, t) {
  return c.useReducer((o, n) => t[o][n] ?? o, e);
}
var Lr = "ScrollArea", [fc, qx] = te(Lr), [pb, be] = fc(Lr), pc = c.forwardRef(
  (e, t) => {
    const {
      __scopeScrollArea: o,
      type: n = "hover",
      dir: r,
      scrollHideDelay: a = 600,
      ...i
    } = e, [s, d] = c.useState(null), [f, u] = c.useState(null), [p, m] = c.useState(null), [v, h] = c.useState(null), [g, b] = c.useState(null), [w, x] = c.useState(0), [y, S] = c.useState(0), [R, T] = c.useState(!1), [A, E] = c.useState(!1), M = F(t, (z) => d(z)), $ = Le(r);
    return /* @__PURE__ */ l(
      pb,
      {
        scope: o,
        type: n,
        dir: $,
        scrollHideDelay: a,
        scrollArea: s,
        viewport: f,
        onViewportChange: u,
        content: p,
        onContentChange: m,
        scrollbarX: v,
        onScrollbarXChange: h,
        scrollbarXEnabled: R,
        onScrollbarXEnabledChange: T,
        scrollbarY: g,
        onScrollbarYChange: b,
        scrollbarYEnabled: A,
        onScrollbarYEnabledChange: E,
        onCornerWidthChange: x,
        onCornerHeightChange: S,
        children: /* @__PURE__ */ l(
          k.div,
          {
            dir: $,
            ...i,
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
pc.displayName = Lr;
var mc = "ScrollAreaViewport", gc = c.forwardRef(
  (e, t) => {
    const { __scopeScrollArea: o, children: n, nonce: r, ...a } = e, i = be(mc, o), s = c.useRef(null), d = F(t, s, i.onViewportChange);
    return /* @__PURE__ */ K(Ve, { children: [
      /* @__PURE__ */ l(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: r
        }
      ),
      /* @__PURE__ */ l(
        k.div,
        {
          "data-radix-scroll-area-viewport": "",
          ...a,
          ref: d,
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
            overflowX: i.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: i.scrollbarYEnabled ? "scroll" : "hidden",
            ...e.style
          },
          children: /* @__PURE__ */ l("div", { ref: i.onContentChange, style: { minWidth: "100%", display: "table" }, children: n })
        }
      )
    ] });
  }
);
gc.displayName = mc;
var ke = "ScrollAreaScrollbar", vc = c.forwardRef(
  (e, t) => {
    const { forceMount: o, ...n } = e, r = be(ke, e.__scopeScrollArea), { onScrollbarXEnabledChange: a, onScrollbarYEnabledChange: i } = r, s = e.orientation === "horizontal";
    return c.useEffect(() => (s ? a(!0) : i(!0), () => {
      s ? a(!1) : i(!1);
    }), [s, a, i]), r.type === "hover" ? /* @__PURE__ */ l(mb, { ...n, ref: t, forceMount: o }) : r.type === "scroll" ? /* @__PURE__ */ l(gb, { ...n, ref: t, forceMount: o }) : r.type === "auto" ? /* @__PURE__ */ l(hc, { ...n, ref: t, forceMount: o }) : r.type === "always" ? /* @__PURE__ */ l($r, { ...n, ref: t }) : null;
  }
);
vc.displayName = ke;
var mb = c.forwardRef((e, t) => {
  const { forceMount: o, ...n } = e, r = be(ke, e.__scopeScrollArea), [a, i] = c.useState(!1);
  return c.useEffect(() => {
    const s = r.scrollArea;
    let d = 0;
    if (s) {
      const f = () => {
        window.clearTimeout(d), i(!0);
      }, u = () => {
        d = window.setTimeout(() => i(!1), r.scrollHideDelay);
      };
      return s.addEventListener("pointerenter", f), s.addEventListener("pointerleave", u), () => {
        window.clearTimeout(d), s.removeEventListener("pointerenter", f), s.removeEventListener("pointerleave", u);
      };
    }
  }, [r.scrollArea, r.scrollHideDelay]), /* @__PURE__ */ l(oe, { present: o || a, children: /* @__PURE__ */ l(
    hc,
    {
      "data-state": a ? "visible" : "hidden",
      ...n,
      ref: t
    }
  ) });
}), gb = c.forwardRef((e, t) => {
  const { forceMount: o, ...n } = e, r = be(ke, e.__scopeScrollArea), a = e.orientation === "horizontal", i = Xo(() => d("SCROLL_END"), 100), [s, d] = fb("hidden", {
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
    if (s === "idle") {
      const f = window.setTimeout(() => d("HIDE"), r.scrollHideDelay);
      return () => window.clearTimeout(f);
    }
  }, [s, r.scrollHideDelay, d]), c.useEffect(() => {
    const f = r.viewport, u = a ? "scrollLeft" : "scrollTop";
    if (f) {
      let p = f[u];
      const m = () => {
        const v = f[u];
        p !== v && (d("SCROLL"), i()), p = v;
      };
      return f.addEventListener("scroll", m), () => f.removeEventListener("scroll", m);
    }
  }, [r.viewport, a, d, i]), /* @__PURE__ */ l(oe, { present: o || s !== "hidden", children: /* @__PURE__ */ l(
    $r,
    {
      "data-state": s === "hidden" ? "hidden" : "visible",
      ...n,
      ref: t,
      onPointerEnter: _(e.onPointerEnter, () => d("POINTER_ENTER")),
      onPointerLeave: _(e.onPointerLeave, () => d("POINTER_LEAVE"))
    }
  ) });
}), hc = c.forwardRef((e, t) => {
  const o = be(ke, e.__scopeScrollArea), { forceMount: n, ...r } = e, [a, i] = c.useState(!1), s = e.orientation === "horizontal", d = Xo(() => {
    if (o.viewport) {
      const f = o.viewport.offsetWidth < o.viewport.scrollWidth, u = o.viewport.offsetHeight < o.viewport.scrollHeight;
      i(s ? f : u);
    }
  }, 10);
  return vt(o.viewport, d), vt(o.content, d), /* @__PURE__ */ l(oe, { present: n || a, children: /* @__PURE__ */ l(
    $r,
    {
      "data-state": a ? "visible" : "hidden",
      ...r,
      ref: t
    }
  ) });
}), $r = c.forwardRef((e, t) => {
  const { orientation: o = "vertical", ...n } = e, r = be(ke, e.__scopeScrollArea), a = c.useRef(null), i = c.useRef(0), [s, d] = c.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  }), f = Cc(s.viewport, s.content), u = {
    ...n,
    sizes: s,
    onSizesChange: d,
    hasThumb: f > 0 && f < 1,
    onThumbChange: (m) => a.current = m,
    onThumbPointerUp: () => i.current = 0,
    onThumbPointerDown: (m) => i.current = m
  };
  function p(m, v) {
    return yb(m, i.current, s, v);
  }
  return o === "horizontal" ? /* @__PURE__ */ l(
    vb,
    {
      ...u,
      ref: t,
      onThumbPositionChange: () => {
        if (r.viewport && a.current) {
          const m = r.viewport.scrollLeft, v = _a(m, s, r.dir);
          a.current.style.transform = `translate3d(${v}px, 0, 0)`;
        }
      },
      onWheelScroll: (m) => {
        r.viewport && (r.viewport.scrollLeft = m);
      },
      onDragScroll: (m) => {
        r.viewport && (r.viewport.scrollLeft = p(m, r.dir));
      }
    }
  ) : o === "vertical" ? /* @__PURE__ */ l(
    hb,
    {
      ...u,
      ref: t,
      onThumbPositionChange: () => {
        if (r.viewport && a.current) {
          const m = r.viewport.scrollTop, v = _a(m, s);
          a.current.style.transform = `translate3d(0, ${v}px, 0)`;
        }
      },
      onWheelScroll: (m) => {
        r.viewport && (r.viewport.scrollTop = m);
      },
      onDragScroll: (m) => {
        r.viewport && (r.viewport.scrollTop = p(m));
      }
    }
  ) : null;
}), vb = c.forwardRef((e, t) => {
  const { sizes: o, onSizesChange: n, ...r } = e, a = be(ke, e.__scopeScrollArea), [i, s] = c.useState(), d = c.useRef(null), f = F(t, d, a.onScrollbarXChange);
  return c.useEffect(() => {
    d.current && s(getComputedStyle(d.current));
  }, [d]), /* @__PURE__ */ l(
    wc,
    {
      "data-orientation": "horizontal",
      ...r,
      ref: f,
      sizes: o,
      style: {
        bottom: 0,
        left: a.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: a.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        "--radix-scroll-area-thumb-width": Yo(o) + "px",
        ...e.style
      },
      onThumbPointerDown: (u) => e.onThumbPointerDown(u.x),
      onDragScroll: (u) => e.onDragScroll(u.x),
      onWheelScroll: (u, p) => {
        if (a.viewport) {
          const m = a.viewport.scrollLeft + u.deltaX;
          e.onWheelScroll(m), Rc(m, p) && u.preventDefault();
        }
      },
      onResize: () => {
        d.current && a.viewport && i && n({
          content: a.viewport.scrollWidth,
          viewport: a.viewport.offsetWidth,
          scrollbar: {
            size: d.current.clientWidth,
            paddingStart: xo(i.paddingLeft),
            paddingEnd: xo(i.paddingRight)
          }
        });
      }
    }
  );
}), hb = c.forwardRef((e, t) => {
  const { sizes: o, onSizesChange: n, ...r } = e, a = be(ke, e.__scopeScrollArea), [i, s] = c.useState(), d = c.useRef(null), f = F(t, d, a.onScrollbarYChange);
  return c.useEffect(() => {
    d.current && s(getComputedStyle(d.current));
  }, [d]), /* @__PURE__ */ l(
    wc,
    {
      "data-orientation": "vertical",
      ...r,
      ref: f,
      sizes: o,
      style: {
        top: 0,
        right: a.dir === "ltr" ? 0 : void 0,
        left: a.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        "--radix-scroll-area-thumb-height": Yo(o) + "px",
        ...e.style
      },
      onThumbPointerDown: (u) => e.onThumbPointerDown(u.y),
      onDragScroll: (u) => e.onDragScroll(u.y),
      onWheelScroll: (u, p) => {
        if (a.viewport) {
          const m = a.viewport.scrollTop + u.deltaY;
          e.onWheelScroll(m), Rc(m, p) && u.preventDefault();
        }
      },
      onResize: () => {
        d.current && a.viewport && i && n({
          content: a.viewport.scrollHeight,
          viewport: a.viewport.offsetHeight,
          scrollbar: {
            size: d.current.clientHeight,
            paddingStart: xo(i.paddingTop),
            paddingEnd: xo(i.paddingBottom)
          }
        });
      }
    }
  );
}), [bb, bc] = fc(ke), wc = c.forwardRef((e, t) => {
  const {
    __scopeScrollArea: o,
    sizes: n,
    hasThumb: r,
    onThumbChange: a,
    onThumbPointerUp: i,
    onThumbPointerDown: s,
    onThumbPositionChange: d,
    onDragScroll: f,
    onWheelScroll: u,
    onResize: p,
    ...m
  } = e, v = be(ke, o), [h, g] = c.useState(null), b = F(t, (M) => g(M)), w = c.useRef(null), x = c.useRef(""), y = v.viewport, S = n.content - n.viewport, R = se(u), T = se(d), A = Xo(p, 10);
  function E(M) {
    if (w.current) {
      const $ = M.clientX - w.current.left, z = M.clientY - w.current.top;
      f({ x: $, y: z });
    }
  }
  return c.useEffect(() => {
    const M = ($) => {
      const z = $.target;
      h?.contains(z) && R($, S);
    };
    return document.addEventListener("wheel", M, { passive: !1 }), () => document.removeEventListener("wheel", M, { passive: !1 });
  }, [y, h, S, R]), c.useEffect(T, [n, T]), vt(h, A), vt(v.content, A), /* @__PURE__ */ l(
    bb,
    {
      scope: o,
      scrollbar: h,
      hasThumb: r,
      onThumbChange: se(a),
      onThumbPointerUp: se(i),
      onThumbPositionChange: T,
      onThumbPointerDown: se(s),
      children: /* @__PURE__ */ l(
        k.div,
        {
          ...m,
          ref: b,
          style: { position: "absolute", ...m.style },
          onPointerDown: _(e.onPointerDown, (M) => {
            M.button === 0 && (M.target.setPointerCapture(M.pointerId), w.current = h.getBoundingClientRect(), x.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", v.viewport && (v.viewport.style.scrollBehavior = "auto"), E(M));
          }),
          onPointerMove: _(e.onPointerMove, E),
          onPointerUp: _(e.onPointerUp, (M) => {
            const $ = M.target;
            $.hasPointerCapture(M.pointerId) && $.releasePointerCapture(M.pointerId), document.body.style.webkitUserSelect = x.current, v.viewport && (v.viewport.style.scrollBehavior = ""), w.current = null;
          })
        }
      )
    }
  );
}), wo = "ScrollAreaThumb", xc = c.forwardRef(
  (e, t) => {
    const { forceMount: o, ...n } = e, r = bc(wo, e.__scopeScrollArea);
    return /* @__PURE__ */ l(oe, { present: o || r.hasThumb, children: /* @__PURE__ */ l(wb, { ref: t, ...n }) });
  }
), wb = c.forwardRef(
  (e, t) => {
    const { __scopeScrollArea: o, style: n, ...r } = e, a = be(wo, o), i = bc(wo, o), { onThumbPositionChange: s } = i, d = F(
      t,
      (p) => i.onThumbChange(p)
    ), f = c.useRef(void 0), u = Xo(() => {
      f.current && (f.current(), f.current = void 0);
    }, 100);
    return c.useEffect(() => {
      const p = a.viewport;
      if (p) {
        const m = () => {
          if (u(), !f.current) {
            const v = Cb(p, s);
            f.current = v, s();
          }
        };
        return s(), p.addEventListener("scroll", m), () => p.removeEventListener("scroll", m);
      }
    }, [a.viewport, u, s]), /* @__PURE__ */ l(
      k.div,
      {
        "data-state": i.hasThumb ? "visible" : "hidden",
        ...r,
        ref: d,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...n
        },
        onPointerDownCapture: _(e.onPointerDownCapture, (p) => {
          const v = p.target.getBoundingClientRect(), h = p.clientX - v.left, g = p.clientY - v.top;
          i.onThumbPointerDown({ x: h, y: g });
        }),
        onPointerUp: _(e.onPointerUp, i.onThumbPointerUp)
      }
    );
  }
);
xc.displayName = wo;
var zr = "ScrollAreaCorner", yc = c.forwardRef(
  (e, t) => {
    const o = be(zr, e.__scopeScrollArea), n = !!(o.scrollbarX && o.scrollbarY);
    return o.type !== "scroll" && n ? /* @__PURE__ */ l(xb, { ...e, ref: t }) : null;
  }
);
yc.displayName = zr;
var xb = c.forwardRef((e, t) => {
  const { __scopeScrollArea: o, ...n } = e, r = be(zr, o), [a, i] = c.useState(0), [s, d] = c.useState(0), f = !!(a && s);
  return vt(r.scrollbarX, () => {
    const u = r.scrollbarX?.offsetHeight || 0;
    r.onCornerHeightChange(u), d(u);
  }), vt(r.scrollbarY, () => {
    const u = r.scrollbarY?.offsetWidth || 0;
    r.onCornerWidthChange(u), i(u);
  }), f ? /* @__PURE__ */ l(
    k.div,
    {
      ...n,
      ref: t,
      style: {
        width: a,
        height: s,
        position: "absolute",
        right: r.dir === "ltr" ? 0 : void 0,
        left: r.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...e.style
      }
    }
  ) : null;
});
function xo(e) {
  return e ? parseInt(e, 10) : 0;
}
function Cc(e, t) {
  const o = e / t;
  return isNaN(o) ? 0 : o;
}
function Yo(e) {
  const t = Cc(e.viewport, e.content), o = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, n = (e.scrollbar.size - o) * t;
  return Math.max(n, 18);
}
function yb(e, t, o, n = "ltr") {
  const r = Yo(o), a = r / 2, i = t || a, s = r - i, d = o.scrollbar.paddingStart + i, f = o.scrollbar.size - o.scrollbar.paddingEnd - s, u = o.content - o.viewport, p = n === "ltr" ? [0, u] : [u * -1, 0];
  return Sc([d, f], p)(e);
}
function _a(e, t, o = "ltr") {
  const n = Yo(t), r = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, a = t.scrollbar.size - r, i = t.content - t.viewport, s = a - n, d = o === "ltr" ? [0, i] : [i * -1, 0], f = Mt(e, d);
  return Sc([0, i], [0, s])(f);
}
function Sc(e, t) {
  return (o) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const n = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + n * (o - e[0]);
  };
}
function Rc(e, t) {
  return e > 0 && e < t;
}
var Cb = (e, t = () => {
}) => {
  let o = { left: e.scrollLeft, top: e.scrollTop }, n = 0;
  return (function r() {
    const a = { left: e.scrollLeft, top: e.scrollTop }, i = o.left !== a.left, s = o.top !== a.top;
    (i || s) && t(), o = a, n = window.requestAnimationFrame(r);
  })(), () => window.cancelAnimationFrame(n);
};
function Xo(e, t) {
  const o = se(e), n = c.useRef(0);
  return c.useEffect(() => () => window.clearTimeout(n.current), []), c.useCallback(() => {
    window.clearTimeout(n.current), n.current = window.setTimeout(o, t);
  }, [o, t]);
}
function vt(e, t) {
  const o = se(t);
  ne(() => {
    let n = 0;
    if (e) {
      const r = new ResizeObserver(() => {
        cancelAnimationFrame(n), n = window.requestAnimationFrame(o);
      });
      return r.observe(e), () => {
        window.cancelAnimationFrame(n), r.unobserve(e);
      };
    }
  }, [e, o]);
}
var Sb = pc, Rb = gc, Eb = yc, Pb = [" ", "Enter", "ArrowUp", "ArrowDown"], _b = [" ", "Enter"], tt = "Select", [qo, Zo, Ab] = Ot(tt), [Rt, Zx] = te(tt, [
  Ab,
  Te
]), Qo = Te(), [Nb, Ye] = Rt(tt), [Tb, kb] = Rt(tt), Ec = (e) => {
  const {
    __scopeSelect: t,
    children: o,
    open: n,
    defaultOpen: r,
    onOpenChange: a,
    value: i,
    defaultValue: s,
    onValueChange: d,
    dir: f,
    name: u,
    autoComplete: p,
    disabled: m,
    required: v,
    form: h
  } = e, g = Qo(t), [b, w] = c.useState(null), [x, y] = c.useState(null), [S, R] = c.useState(!1), T = Le(f), [A, E] = ae({
    prop: n,
    defaultProp: r ?? !1,
    onChange: a,
    caller: tt
  }), [M, $] = ae({
    prop: i,
    defaultProp: s,
    onChange: d,
    caller: tt
  }), z = c.useRef(null), V = b ? h || !!b.closest("form") : !0, [H, G] = c.useState(/* @__PURE__ */ new Set()), U = Array.from(H).map((L) => L.props.value).join(";");
  return /* @__PURE__ */ l(Ct, { ...g, children: /* @__PURE__ */ K(
    Nb,
    {
      required: v,
      scope: t,
      trigger: b,
      onTriggerChange: w,
      valueNode: x,
      onValueNodeChange: y,
      valueNodeHasChildren: S,
      onValueNodeHasChildrenChange: R,
      contentId: de(),
      value: M,
      onValueChange: $,
      open: A,
      onOpenChange: E,
      dir: T,
      triggerPointerDownPosRef: z,
      disabled: m,
      children: [
        /* @__PURE__ */ l(qo.Provider, { scope: t, children: /* @__PURE__ */ l(
          Tb,
          {
            scope: e.__scopeSelect,
            onNativeOptionAdd: c.useCallback((L) => {
              G((B) => new Set(B).add(L));
            }, []),
            onNativeOptionRemove: c.useCallback((L) => {
              G((B) => {
                const P = new Set(B);
                return P.delete(L), P;
              });
            }, []),
            children: o
          }
        ) }),
        V ? /* @__PURE__ */ K(
          qc,
          {
            "aria-hidden": !0,
            required: v,
            tabIndex: -1,
            name: u,
            autoComplete: p,
            value: M,
            onChange: (L) => $(L.target.value),
            disabled: m,
            form: h,
            children: [
              M === void 0 ? /* @__PURE__ */ l("option", { value: "" }) : null,
              Array.from(H)
            ]
          },
          U
        ) : null
      ]
    }
  ) });
};
Ec.displayName = tt;
var Pc = "SelectTrigger", _c = c.forwardRef(
  (e, t) => {
    const { __scopeSelect: o, disabled: n = !1, ...r } = e, a = Qo(o), i = Ye(Pc, o), s = i.disabled || n, d = F(t, i.onTriggerChange), f = Zo(o), u = c.useRef("touch"), [p, m, v] = Qc((g) => {
      const b = f().filter((y) => !y.disabled), w = b.find((y) => y.value === i.value), x = Jc(b, g, w);
      x !== void 0 && i.onValueChange(x.value);
    }), h = (g) => {
      s || (i.onOpenChange(!0), v()), g && (i.triggerPointerDownPosRef.current = {
        x: Math.round(g.pageX),
        y: Math.round(g.pageY)
      });
    };
    return /* @__PURE__ */ l(St, { asChild: !0, ...a, children: /* @__PURE__ */ l(
      k.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": i.contentId,
        "aria-expanded": i.open,
        "aria-required": i.required,
        "aria-autocomplete": "none",
        dir: i.dir,
        "data-state": i.open ? "open" : "closed",
        disabled: s,
        "data-disabled": s ? "" : void 0,
        "data-placeholder": Zc(i.value) ? "" : void 0,
        ...r,
        ref: d,
        onClick: _(r.onClick, (g) => {
          g.currentTarget.focus(), u.current !== "mouse" && h(g);
        }),
        onPointerDown: _(r.onPointerDown, (g) => {
          u.current = g.pointerType;
          const b = g.target;
          b.hasPointerCapture(g.pointerId) && b.releasePointerCapture(g.pointerId), g.button === 0 && g.ctrlKey === !1 && g.pointerType === "mouse" && (h(g), g.preventDefault());
        }),
        onKeyDown: _(r.onKeyDown, (g) => {
          const b = p.current !== "";
          !(g.ctrlKey || g.altKey || g.metaKey) && g.key.length === 1 && m(g.key), !(b && g.key === " ") && Pb.includes(g.key) && (h(), g.preventDefault());
        })
      }
    ) });
  }
);
_c.displayName = Pc;
var Ac = "SelectValue", Nc = c.forwardRef(
  (e, t) => {
    const { __scopeSelect: o, className: n, style: r, children: a, placeholder: i = "", ...s } = e, d = Ye(Ac, o), { onValueNodeHasChildrenChange: f } = d, u = a !== void 0, p = F(t, d.onValueNodeChange);
    return ne(() => {
      f(u);
    }, [f, u]), /* @__PURE__ */ l(
      k.span,
      {
        ...s,
        ref: p,
        style: { pointerEvents: "none" },
        children: Zc(d.value) ? /* @__PURE__ */ l(Ve, { children: i }) : a
      }
    );
  }
);
Nc.displayName = Ac;
var Ib = "SelectIcon", Tc = c.forwardRef(
  (e, t) => {
    const { __scopeSelect: o, children: n, ...r } = e;
    return /* @__PURE__ */ l(k.span, { "aria-hidden": !0, ...r, ref: t, children: n || "▼" });
  }
);
Tc.displayName = Ib;
var Mb = "SelectPortal", kc = (e) => /* @__PURE__ */ l(rt, { asChild: !0, ...e });
kc.displayName = Mb;
var ot = "SelectContent", Ic = c.forwardRef(
  (e, t) => {
    const o = Ye(ot, e.__scopeSelect), [n, r] = c.useState();
    if (ne(() => {
      r(new DocumentFragment());
    }, []), !o.open) {
      const a = n;
      return a ? So.createPortal(
        /* @__PURE__ */ l(Mc, { scope: e.__scopeSelect, children: /* @__PURE__ */ l(qo.Slot, { scope: e.__scopeSelect, children: /* @__PURE__ */ l("div", { children: e.children }) }) }),
        a
      ) : null;
    }
    return /* @__PURE__ */ l(Dc, { ...e, ref: t });
  }
);
Ic.displayName = ot;
var xe = 10, [Mc, Xe] = Rt(ot), Db = "SelectContentImpl", Ob = /* @__PURE__ */ Ge("SelectContent.RemoveScroll"), Dc = c.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: o,
      position: n = "item-aligned",
      onCloseAutoFocus: r,
      onEscapeKeyDown: a,
      onPointerDownOutside: i,
      //
      // PopperContent props
      side: s,
      sideOffset: d,
      align: f,
      alignOffset: u,
      arrowPadding: p,
      collisionBoundary: m,
      collisionPadding: v,
      sticky: h,
      hideWhenDetached: g,
      avoidCollisions: b,
      //
      ...w
    } = e, x = Ye(ot, o), [y, S] = c.useState(null), [R, T] = c.useState(null), A = F(t, (N) => S(N)), [E, M] = c.useState(null), [$, z] = c.useState(
      null
    ), V = Zo(o), [H, G] = c.useState(!1), U = c.useRef(!1);
    c.useEffect(() => {
      if (y) return Io(y);
    }, [y]), To();
    const L = c.useCallback(
      (N) => {
        const [X, ...re] = V().map((J) => J.ref.current), [Y] = re.slice(-1), q = document.activeElement;
        for (const J of N)
          if (J === q || (J?.scrollIntoView({ block: "nearest" }), J === X && R && (R.scrollTop = 0), J === Y && R && (R.scrollTop = R.scrollHeight), J?.focus(), document.activeElement !== q)) return;
      },
      [V, R]
    ), B = c.useCallback(
      () => L([E, y]),
      [L, E, y]
    );
    c.useEffect(() => {
      H && B();
    }, [H, B]);
    const { onOpenChange: P, triggerPointerDownPosRef: I } = x;
    c.useEffect(() => {
      if (y) {
        let N = { x: 0, y: 0 };
        const X = (Y) => {
          N = {
            x: Math.abs(Math.round(Y.pageX) - (I.current?.x ?? 0)),
            y: Math.abs(Math.round(Y.pageY) - (I.current?.y ?? 0))
          };
        }, re = (Y) => {
          N.x <= 10 && N.y <= 10 ? Y.preventDefault() : y.contains(Y.target) || P(!1), document.removeEventListener("pointermove", X), I.current = null;
        };
        return I.current !== null && (document.addEventListener("pointermove", X), document.addEventListener("pointerup", re, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", X), document.removeEventListener("pointerup", re, { capture: !0 });
        };
      }
    }, [y, P, I]), c.useEffect(() => {
      const N = () => P(!1);
      return window.addEventListener("blur", N), window.addEventListener("resize", N), () => {
        window.removeEventListener("blur", N), window.removeEventListener("resize", N);
      };
    }, [P]);
    const [ee, le] = Qc((N) => {
      const X = V().filter((q) => !q.disabled), re = X.find((q) => q.ref.current === document.activeElement), Y = Jc(X, N, re);
      Y && setTimeout(() => Y.ref.current.focus());
    }), fe = c.useCallback(
      (N, X, re) => {
        const Y = !U.current && !re;
        (x.value !== void 0 && x.value === X || Y) && (M(N), Y && (U.current = !0));
      },
      [x.value]
    ), Q = c.useCallback(() => y?.focus(), [y]), Z = c.useCallback(
      (N, X, re) => {
        const Y = !U.current && !re;
        (x.value !== void 0 && x.value === X || Y) && z(N);
      },
      [x.value]
    ), pe = n === "popper" ? Ln : Oc, ce = pe === Ln ? {
      side: s,
      sideOffset: d,
      align: f,
      alignOffset: u,
      arrowPadding: p,
      collisionBoundary: m,
      collisionPadding: v,
      sticky: h,
      hideWhenDetached: g,
      avoidCollisions: b
    } : {};
    return /* @__PURE__ */ l(
      Mc,
      {
        scope: o,
        content: y,
        viewport: R,
        onViewportChange: T,
        itemRefCallback: fe,
        selectedItem: E,
        onItemLeave: Q,
        itemTextRefCallback: Z,
        focusSelectedItem: B,
        selectedItemText: $,
        position: n,
        isPositioned: H,
        searchRef: ee,
        children: /* @__PURE__ */ l($t, { as: Ob, allowPinchZoom: !0, children: /* @__PURE__ */ l(
          Lt,
          {
            asChild: !0,
            trapped: x.open,
            onMountAutoFocus: (N) => {
              N.preventDefault();
            },
            onUnmountAutoFocus: _(r, (N) => {
              x.trigger?.focus({ preventScroll: !0 }), N.preventDefault();
            }),
            children: /* @__PURE__ */ l(
              nt,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: a,
                onPointerDownOutside: i,
                onFocusOutside: (N) => N.preventDefault(),
                onDismiss: () => x.onOpenChange(!1),
                children: /* @__PURE__ */ l(
                  pe,
                  {
                    role: "listbox",
                    id: x.contentId,
                    "data-state": x.open ? "open" : "closed",
                    dir: x.dir,
                    onContextMenu: (N) => N.preventDefault(),
                    ...w,
                    ...ce,
                    onPlaced: () => G(!0),
                    ref: A,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...w.style
                    },
                    onKeyDown: _(w.onKeyDown, (N) => {
                      const X = N.ctrlKey || N.altKey || N.metaKey;
                      if (N.key === "Tab" && N.preventDefault(), !X && N.key.length === 1 && le(N.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(N.key)) {
                        let Y = V().filter((q) => !q.disabled).map((q) => q.ref.current);
                        if (["ArrowUp", "End"].includes(N.key) && (Y = Y.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(N.key)) {
                          const q = N.target, J = Y.indexOf(q);
                          Y = Y.slice(J + 1);
                        }
                        setTimeout(() => L(Y)), N.preventDefault();
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
Dc.displayName = Db;
var Lb = "SelectItemAlignedPosition", Oc = c.forwardRef((e, t) => {
  const { __scopeSelect: o, onPlaced: n, ...r } = e, a = Ye(ot, o), i = Xe(ot, o), [s, d] = c.useState(null), [f, u] = c.useState(null), p = F(t, (A) => u(A)), m = Zo(o), v = c.useRef(!1), h = c.useRef(!0), { viewport: g, selectedItem: b, selectedItemText: w, focusSelectedItem: x } = i, y = c.useCallback(() => {
    if (a.trigger && a.valueNode && s && f && g && b && w) {
      const A = a.trigger.getBoundingClientRect(), E = f.getBoundingClientRect(), M = a.valueNode.getBoundingClientRect(), $ = w.getBoundingClientRect();
      if (a.dir !== "rtl") {
        const q = $.left - E.left, J = M.left - q, ve = A.left - J, Ze = A.width + ve, an = Math.max(Ze, E.width), sn = window.innerWidth - xe, ln = Mt(J, [
          xe,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(xe, sn - an)
        ]);
        s.style.minWidth = Ze + "px", s.style.left = ln + "px";
      } else {
        const q = E.right - $.right, J = window.innerWidth - M.right - q, ve = window.innerWidth - A.right - J, Ze = A.width + ve, an = Math.max(Ze, E.width), sn = window.innerWidth - xe, ln = Mt(J, [
          xe,
          Math.max(xe, sn - an)
        ]);
        s.style.minWidth = Ze + "px", s.style.right = ln + "px";
      }
      const z = m(), V = window.innerHeight - xe * 2, H = g.scrollHeight, G = window.getComputedStyle(f), U = parseInt(G.borderTopWidth, 10), L = parseInt(G.paddingTop, 10), B = parseInt(G.borderBottomWidth, 10), P = parseInt(G.paddingBottom, 10), I = U + L + H + P + B, ee = Math.min(b.offsetHeight * 5, I), le = window.getComputedStyle(g), fe = parseInt(le.paddingTop, 10), Q = parseInt(le.paddingBottom, 10), Z = A.top + A.height / 2 - xe, pe = V - Z, ce = b.offsetHeight / 2, N = b.offsetTop + ce, X = U + L + N, re = I - X;
      if (X <= Z) {
        const q = z.length > 0 && b === z[z.length - 1].ref.current;
        s.style.bottom = "0px";
        const J = f.clientHeight - g.offsetTop - g.offsetHeight, ve = Math.max(
          pe,
          ce + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (q ? Q : 0) + J + B
        ), Ze = X + ve;
        s.style.height = Ze + "px";
      } else {
        const q = z.length > 0 && b === z[0].ref.current;
        s.style.top = "0px";
        const ve = Math.max(
          Z,
          U + g.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (q ? fe : 0) + ce
        ) + re;
        s.style.height = ve + "px", g.scrollTop = X - Z + g.offsetTop;
      }
      s.style.margin = `${xe}px 0`, s.style.minHeight = ee + "px", s.style.maxHeight = V + "px", n?.(), requestAnimationFrame(() => v.current = !0);
    }
  }, [
    m,
    a.trigger,
    a.valueNode,
    s,
    f,
    g,
    b,
    w,
    a.dir,
    n
  ]);
  ne(() => y(), [y]);
  const [S, R] = c.useState();
  ne(() => {
    f && R(window.getComputedStyle(f).zIndex);
  }, [f]);
  const T = c.useCallback(
    (A) => {
      A && h.current === !0 && (y(), x?.(), h.current = !1);
    },
    [y, x]
  );
  return /* @__PURE__ */ l(
    zb,
    {
      scope: o,
      contentWrapper: s,
      shouldExpandOnScrollRef: v,
      onScrollButtonChange: T,
      children: /* @__PURE__ */ l(
        "div",
        {
          ref: d,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: S
          },
          children: /* @__PURE__ */ l(
            k.div,
            {
              ...r,
              ref: p,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...r.style
              }
            }
          )
        }
      )
    }
  );
});
Oc.displayName = Lb;
var $b = "SelectPopperPosition", Ln = c.forwardRef((e, t) => {
  const {
    __scopeSelect: o,
    align: n = "start",
    collisionPadding: r = xe,
    ...a
  } = e, i = Qo(o);
  return /* @__PURE__ */ l(
    Vt,
    {
      ...i,
      ...a,
      ref: t,
      align: n,
      collisionPadding: r,
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
Ln.displayName = $b;
var [zb, Fr] = Rt(ot, {}), $n = "SelectViewport", Lc = c.forwardRef(
  (e, t) => {
    const { __scopeSelect: o, nonce: n, ...r } = e, a = Xe($n, o), i = Fr($n, o), s = F(t, a.onViewportChange), d = c.useRef(0);
    return /* @__PURE__ */ K(Ve, { children: [
      /* @__PURE__ */ l(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: n
        }
      ),
      /* @__PURE__ */ l(qo.Slot, { scope: o, children: /* @__PURE__ */ l(
        k.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...r,
          ref: s,
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
            ...r.style
          },
          onScroll: _(r.onScroll, (f) => {
            const u = f.currentTarget, { contentWrapper: p, shouldExpandOnScrollRef: m } = i;
            if (m?.current && p) {
              const v = Math.abs(d.current - u.scrollTop);
              if (v > 0) {
                const h = window.innerHeight - xe * 2, g = parseFloat(p.style.minHeight), b = parseFloat(p.style.height), w = Math.max(g, b);
                if (w < h) {
                  const x = w + v, y = Math.min(h, x), S = x - y;
                  p.style.height = y + "px", p.style.bottom === "0px" && (u.scrollTop = S > 0 ? S : 0, p.style.justifyContent = "flex-end");
                }
              }
            }
            d.current = u.scrollTop;
          })
        }
      ) })
    ] });
  }
);
Lc.displayName = $n;
var $c = "SelectGroup", [Fb, Bb] = Rt($c), zc = c.forwardRef(
  (e, t) => {
    const { __scopeSelect: o, ...n } = e, r = de();
    return /* @__PURE__ */ l(Fb, { scope: o, id: r, children: /* @__PURE__ */ l(k.div, { role: "group", "aria-labelledby": r, ...n, ref: t }) });
  }
);
zc.displayName = $c;
var Fc = "SelectLabel", Bc = c.forwardRef(
  (e, t) => {
    const { __scopeSelect: o, ...n } = e, r = Bb(Fc, o);
    return /* @__PURE__ */ l(k.div, { id: r.id, ...n, ref: t });
  }
);
Bc.displayName = Fc;
var yo = "SelectItem", [Vb, Vc] = Rt(yo), Gc = c.forwardRef(
  (e, t) => {
    const {
      __scopeSelect: o,
      value: n,
      disabled: r = !1,
      textValue: a,
      ...i
    } = e, s = Ye(yo, o), d = Xe(yo, o), f = s.value === n, [u, p] = c.useState(a ?? ""), [m, v] = c.useState(!1), h = F(
      t,
      (x) => d.itemRefCallback?.(x, n, r)
    ), g = de(), b = c.useRef("touch"), w = () => {
      r || (s.onValueChange(n), s.onOpenChange(!1));
    };
    if (n === "")
      throw new Error(
        "A <Select.Item /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder."
      );
    return /* @__PURE__ */ l(
      Vb,
      {
        scope: o,
        value: n,
        disabled: r,
        textId: g,
        isSelected: f,
        onItemTextChange: c.useCallback((x) => {
          p((y) => y || (x?.textContent ?? "").trim());
        }, []),
        children: /* @__PURE__ */ l(
          qo.ItemSlot,
          {
            scope: o,
            value: n,
            disabled: r,
            textValue: u,
            children: /* @__PURE__ */ l(
              k.div,
              {
                role: "option",
                "aria-labelledby": g,
                "data-highlighted": m ? "" : void 0,
                "aria-selected": f && m,
                "data-state": f ? "checked" : "unchecked",
                "aria-disabled": r || void 0,
                "data-disabled": r ? "" : void 0,
                tabIndex: r ? void 0 : -1,
                ...i,
                ref: h,
                onFocus: _(i.onFocus, () => v(!0)),
                onBlur: _(i.onBlur, () => v(!1)),
                onClick: _(i.onClick, () => {
                  b.current !== "mouse" && w();
                }),
                onPointerUp: _(i.onPointerUp, () => {
                  b.current === "mouse" && w();
                }),
                onPointerDown: _(i.onPointerDown, (x) => {
                  b.current = x.pointerType;
                }),
                onPointerMove: _(i.onPointerMove, (x) => {
                  b.current = x.pointerType, r ? d.onItemLeave?.() : b.current === "mouse" && x.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: _(i.onPointerLeave, (x) => {
                  x.currentTarget === document.activeElement && d.onItemLeave?.();
                }),
                onKeyDown: _(i.onKeyDown, (x) => {
                  d.searchRef?.current !== "" && x.key === " " || (_b.includes(x.key) && w(), x.key === " " && x.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }
);
Gc.displayName = yo;
var At = "SelectItemText", Hc = c.forwardRef(
  (e, t) => {
    const { __scopeSelect: o, className: n, style: r, ...a } = e, i = Ye(At, o), s = Xe(At, o), d = Vc(At, o), f = kb(At, o), [u, p] = c.useState(null), m = F(
      t,
      (w) => p(w),
      d.onItemTextChange,
      (w) => s.itemTextRefCallback?.(w, d.value, d.disabled)
    ), v = u?.textContent, h = c.useMemo(
      () => /* @__PURE__ */ l("option", { value: d.value, disabled: d.disabled, children: v }, d.value),
      [d.disabled, d.value, v]
    ), { onNativeOptionAdd: g, onNativeOptionRemove: b } = f;
    return ne(() => (g(h), () => b(h)), [g, b, h]), /* @__PURE__ */ K(Ve, { children: [
      /* @__PURE__ */ l(k.span, { id: d.textId, ...a, ref: m }),
      d.isSelected && i.valueNode && !i.valueNodeHasChildren ? So.createPortal(a.children, i.valueNode) : null
    ] });
  }
);
Hc.displayName = At;
var Wc = "SelectItemIndicator", Uc = c.forwardRef(
  (e, t) => {
    const { __scopeSelect: o, ...n } = e;
    return Vc(Wc, o).isSelected ? /* @__PURE__ */ l(k.span, { "aria-hidden": !0, ...n, ref: t }) : null;
  }
);
Uc.displayName = Wc;
var zn = "SelectScrollUpButton", Kc = c.forwardRef((e, t) => {
  const o = Xe(zn, e.__scopeSelect), n = Fr(zn, e.__scopeSelect), [r, a] = c.useState(!1), i = F(t, n.onScrollButtonChange);
  return ne(() => {
    if (o.viewport && o.isPositioned) {
      let s = function() {
        const f = d.scrollTop > 0;
        a(f);
      };
      const d = o.viewport;
      return s(), d.addEventListener("scroll", s), () => d.removeEventListener("scroll", s);
    }
  }, [o.viewport, o.isPositioned]), r ? /* @__PURE__ */ l(
    Yc,
    {
      ...e,
      ref: i,
      onAutoScroll: () => {
        const { viewport: s, selectedItem: d } = o;
        s && d && (s.scrollTop = s.scrollTop - d.offsetHeight);
      }
    }
  ) : null;
});
Kc.displayName = zn;
var Fn = "SelectScrollDownButton", jc = c.forwardRef((e, t) => {
  const o = Xe(Fn, e.__scopeSelect), n = Fr(Fn, e.__scopeSelect), [r, a] = c.useState(!1), i = F(t, n.onScrollButtonChange);
  return ne(() => {
    if (o.viewport && o.isPositioned) {
      let s = function() {
        const f = d.scrollHeight - d.clientHeight, u = Math.ceil(d.scrollTop) < f;
        a(u);
      };
      const d = o.viewport;
      return s(), d.addEventListener("scroll", s), () => d.removeEventListener("scroll", s);
    }
  }, [o.viewport, o.isPositioned]), r ? /* @__PURE__ */ l(
    Yc,
    {
      ...e,
      ref: i,
      onAutoScroll: () => {
        const { viewport: s, selectedItem: d } = o;
        s && d && (s.scrollTop = s.scrollTop + d.offsetHeight);
      }
    }
  ) : null;
});
jc.displayName = Fn;
var Yc = c.forwardRef((e, t) => {
  const { __scopeSelect: o, onAutoScroll: n, ...r } = e, a = Xe("SelectScrollButton", o), i = c.useRef(null), s = Zo(o), d = c.useCallback(() => {
    i.current !== null && (window.clearInterval(i.current), i.current = null);
  }, []);
  return c.useEffect(() => () => d(), [d]), ne(() => {
    s().find((u) => u.ref.current === document.activeElement)?.ref.current?.scrollIntoView({ block: "nearest" });
  }, [s]), /* @__PURE__ */ l(
    k.div,
    {
      "aria-hidden": !0,
      ...r,
      ref: t,
      style: { flexShrink: 0, ...r.style },
      onPointerDown: _(r.onPointerDown, () => {
        i.current === null && (i.current = window.setInterval(n, 50));
      }),
      onPointerMove: _(r.onPointerMove, () => {
        a.onItemLeave?.(), i.current === null && (i.current = window.setInterval(n, 50));
      }),
      onPointerLeave: _(r.onPointerLeave, () => {
        d();
      })
    }
  );
}), Gb = "SelectSeparator", Xc = c.forwardRef(
  (e, t) => {
    const { __scopeSelect: o, ...n } = e;
    return /* @__PURE__ */ l(k.div, { "aria-hidden": !0, ...n, ref: t });
  }
);
Xc.displayName = Gb;
var Bn = "SelectArrow", Hb = c.forwardRef(
  (e, t) => {
    const { __scopeSelect: o, ...n } = e, r = Qo(o), a = Ye(Bn, o), i = Xe(Bn, o);
    return a.open && i.position === "popper" ? /* @__PURE__ */ l(Gt, { ...r, ...n, ref: t }) : null;
  }
);
Hb.displayName = Bn;
var Wb = "SelectBubbleInput", qc = c.forwardRef(
  ({ __scopeSelect: e, value: t, ...o }, n) => {
    const r = c.useRef(null), a = F(n, r), i = zt(t);
    return c.useEffect(() => {
      const s = r.current;
      if (!s) return;
      const d = window.HTMLSelectElement.prototype, u = Object.getOwnPropertyDescriptor(
        d,
        "value"
      ).set;
      if (i !== t && u) {
        const p = new Event("change", { bubbles: !0 });
        u.call(s, t), s.dispatchEvent(p);
      }
    }, [i, t]), /* @__PURE__ */ l(
      k.select,
      {
        ...o,
        style: { ...Qa, ...o.style },
        ref: a,
        defaultValue: t
      }
    );
  }
);
qc.displayName = Wb;
function Zc(e) {
  return e === "" || e === void 0;
}
function Qc(e) {
  const t = se(e), o = c.useRef(""), n = c.useRef(0), r = c.useCallback(
    (i) => {
      const s = o.current + i;
      t(s), (function d(f) {
        o.current = f, window.clearTimeout(n.current), f !== "" && (n.current = window.setTimeout(() => d(""), 1e3));
      })(s);
    },
    [t]
  ), a = c.useCallback(() => {
    o.current = "", window.clearTimeout(n.current);
  }, []);
  return c.useEffect(() => () => window.clearTimeout(n.current), []), [o, r, a];
}
function Jc(e, t, o) {
  const r = t.length > 1 && Array.from(t).every((f) => f === t[0]) ? t[0] : t, a = o ? e.indexOf(o) : -1;
  let i = Ub(e, Math.max(a, 0));
  r.length === 1 && (i = i.filter((f) => f !== o));
  const d = i.find(
    (f) => f.textValue.toLowerCase().startsWith(r.toLowerCase())
  );
  return d !== o ? d : void 0;
}
function Ub(e, t) {
  return e.map((o, n) => e[(t + n) % e.length]);
}
var Kb = Ec, jb = _c, Yb = Nc, Xb = Tc, qb = kc, Zb = Ic, Qb = Lc, Jb = zc, ew = Bc, tw = Gc, ow = Hc, nw = Uc, rw = Kc, aw = jc, iw = Xc, sw = "Separator", Aa = "horizontal", lw = ["horizontal", "vertical"], ed = c.forwardRef((e, t) => {
  const { decorative: o, orientation: n = Aa, ...r } = e, a = cw(n) ? n : Aa, s = o ? { role: "none" } : { "aria-orientation": a === "vertical" ? a : void 0, role: "separator" };
  return /* @__PURE__ */ l(
    k.div,
    {
      "data-orientation": a,
      ...s,
      ...r,
      ref: t
    }
  );
});
ed.displayName = sw;
function cw(e) {
  return lw.includes(e);
}
var dw = ed, td = ["PageUp", "PageDown"], od = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], nd = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
}, Et = "Slider", [Vn, uw, fw] = Ot(Et), [rd, Qx] = te(Et, [
  fw
]), [pw, Jo] = rd(Et), ad = c.forwardRef(
  (e, t) => {
    const {
      name: o,
      min: n = 0,
      max: r = 100,
      step: a = 1,
      orientation: i = "horizontal",
      disabled: s = !1,
      minStepsBetweenThumbs: d = 0,
      defaultValue: f = [n],
      value: u,
      onValueChange: p = () => {
      },
      onValueCommit: m = () => {
      },
      inverted: v = !1,
      form: h,
      ...g
    } = e, b = c.useRef(/* @__PURE__ */ new Set()), w = c.useRef(0), y = i === "horizontal" ? mw : gw, [S = [], R] = ae({
      prop: u,
      defaultProp: f,
      onChange: (z) => {
        [...b.current][w.current]?.focus(), p(z);
      }
    }), T = c.useRef(S);
    function A(z) {
      const V = xw(S, z);
      $(z, V);
    }
    function E(z) {
      $(z, w.current);
    }
    function M() {
      const z = T.current[w.current];
      S[w.current] !== z && m(S);
    }
    function $(z, V, { commit: H } = { commit: !1 }) {
      const G = Rw(a), U = Ew(Math.round((z - n) / a) * a + n, G), L = Mt(U, [n, r]);
      R((B = []) => {
        const P = bw(B, L, V);
        if (Sw(P, d * a)) {
          w.current = P.indexOf(L);
          const I = String(P) !== String(B);
          return I && H && m(P), I ? P : B;
        } else
          return B;
      });
    }
    return /* @__PURE__ */ l(
      pw,
      {
        scope: e.__scopeSlider,
        name: o,
        disabled: s,
        min: n,
        max: r,
        valueIndexToChangeRef: w,
        thumbs: b.current,
        values: S,
        orientation: i,
        form: h,
        children: /* @__PURE__ */ l(Vn.Provider, { scope: e.__scopeSlider, children: /* @__PURE__ */ l(Vn.Slot, { scope: e.__scopeSlider, children: /* @__PURE__ */ l(
          y,
          {
            "aria-disabled": s,
            "data-disabled": s ? "" : void 0,
            ...g,
            ref: t,
            onPointerDown: _(g.onPointerDown, () => {
              s || (T.current = S);
            }),
            min: n,
            max: r,
            inverted: v,
            onSlideStart: s ? void 0 : A,
            onSlideMove: s ? void 0 : E,
            onSlideEnd: s ? void 0 : M,
            onHomeKeyDown: () => !s && $(n, 0, { commit: !0 }),
            onEndKeyDown: () => !s && $(r, S.length - 1, { commit: !0 }),
            onStepKeyDown: ({ event: z, direction: V }) => {
              if (!s) {
                const U = td.includes(z.key) || z.shiftKey && od.includes(z.key) ? 10 : 1, L = w.current, B = S[L], P = a * U * V;
                $(B + P, L, { commit: !0 });
              }
            }
          }
        ) }) })
      }
    );
  }
);
ad.displayName = Et;
var [id, sd] = rd(Et, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
}), mw = c.forwardRef(
  (e, t) => {
    const {
      min: o,
      max: n,
      dir: r,
      inverted: a,
      onSlideStart: i,
      onSlideMove: s,
      onSlideEnd: d,
      onStepKeyDown: f,
      ...u
    } = e, [p, m] = c.useState(null), v = F(t, (y) => m(y)), h = c.useRef(void 0), g = Le(r), b = g === "ltr", w = b && !a || !b && a;
    function x(y) {
      const S = h.current || p.getBoundingClientRect(), R = [0, S.width], A = Br(R, w ? [o, n] : [n, o]);
      return h.current = S, A(y - S.left);
    }
    return /* @__PURE__ */ l(
      id,
      {
        scope: e.__scopeSlider,
        startEdge: w ? "left" : "right",
        endEdge: w ? "right" : "left",
        direction: w ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ l(
          ld,
          {
            dir: g,
            "data-orientation": "horizontal",
            ...u,
            ref: v,
            style: {
              ...u.style,
              "--radix-slider-thumb-transform": "translateX(-50%)"
            },
            onSlideStart: (y) => {
              const S = x(y.clientX);
              i?.(S);
            },
            onSlideMove: (y) => {
              const S = x(y.clientX);
              s?.(S);
            },
            onSlideEnd: () => {
              h.current = void 0, d?.();
            },
            onStepKeyDown: (y) => {
              const R = nd[w ? "from-left" : "from-right"].includes(y.key);
              f?.({ event: y, direction: R ? -1 : 1 });
            }
          }
        )
      }
    );
  }
), gw = c.forwardRef(
  (e, t) => {
    const {
      min: o,
      max: n,
      inverted: r,
      onSlideStart: a,
      onSlideMove: i,
      onSlideEnd: s,
      onStepKeyDown: d,
      ...f
    } = e, u = c.useRef(null), p = F(t, u), m = c.useRef(void 0), v = !r;
    function h(g) {
      const b = m.current || u.current.getBoundingClientRect(), w = [0, b.height], y = Br(w, v ? [n, o] : [o, n]);
      return m.current = b, y(g - b.top);
    }
    return /* @__PURE__ */ l(
      id,
      {
        scope: e.__scopeSlider,
        startEdge: v ? "bottom" : "top",
        endEdge: v ? "top" : "bottom",
        size: "height",
        direction: v ? 1 : -1,
        children: /* @__PURE__ */ l(
          ld,
          {
            "data-orientation": "vertical",
            ...f,
            ref: p,
            style: {
              ...f.style,
              "--radix-slider-thumb-transform": "translateY(50%)"
            },
            onSlideStart: (g) => {
              const b = h(g.clientY);
              a?.(b);
            },
            onSlideMove: (g) => {
              const b = h(g.clientY);
              i?.(b);
            },
            onSlideEnd: () => {
              m.current = void 0, s?.();
            },
            onStepKeyDown: (g) => {
              const w = nd[v ? "from-bottom" : "from-top"].includes(g.key);
              d?.({ event: g, direction: w ? -1 : 1 });
            }
          }
        )
      }
    );
  }
), ld = c.forwardRef(
  (e, t) => {
    const {
      __scopeSlider: o,
      onSlideStart: n,
      onSlideMove: r,
      onSlideEnd: a,
      onHomeKeyDown: i,
      onEndKeyDown: s,
      onStepKeyDown: d,
      ...f
    } = e, u = Jo(Et, o);
    return /* @__PURE__ */ l(
      k.span,
      {
        ...f,
        ref: t,
        onKeyDown: _(e.onKeyDown, (p) => {
          p.key === "Home" ? (i(p), p.preventDefault()) : p.key === "End" ? (s(p), p.preventDefault()) : td.concat(od).includes(p.key) && (d(p), p.preventDefault());
        }),
        onPointerDown: _(e.onPointerDown, (p) => {
          const m = p.target;
          m.setPointerCapture(p.pointerId), p.preventDefault(), u.thumbs.has(m) ? m.focus() : n(p);
        }),
        onPointerMove: _(e.onPointerMove, (p) => {
          p.target.hasPointerCapture(p.pointerId) && r(p);
        }),
        onPointerUp: _(e.onPointerUp, (p) => {
          const m = p.target;
          m.hasPointerCapture(p.pointerId) && (m.releasePointerCapture(p.pointerId), a(p));
        })
      }
    );
  }
), cd = "SliderTrack", dd = c.forwardRef(
  (e, t) => {
    const { __scopeSlider: o, ...n } = e, r = Jo(cd, o);
    return /* @__PURE__ */ l(
      k.span,
      {
        "data-disabled": r.disabled ? "" : void 0,
        "data-orientation": r.orientation,
        ...n,
        ref: t
      }
    );
  }
);
dd.displayName = cd;
var Gn = "SliderRange", ud = c.forwardRef(
  (e, t) => {
    const { __scopeSlider: o, ...n } = e, r = Jo(Gn, o), a = sd(Gn, o), i = c.useRef(null), s = F(t, i), d = r.values.length, f = r.values.map(
      (m) => md(m, r.min, r.max)
    ), u = d > 1 ? Math.min(...f) : 0, p = 100 - Math.max(...f);
    return /* @__PURE__ */ l(
      k.span,
      {
        "data-orientation": r.orientation,
        "data-disabled": r.disabled ? "" : void 0,
        ...n,
        ref: s,
        style: {
          ...e.style,
          [a.startEdge]: u + "%",
          [a.endEdge]: p + "%"
        }
      }
    );
  }
);
ud.displayName = Gn;
var Hn = "SliderThumb", fd = c.forwardRef(
  (e, t) => {
    const o = uw(e.__scopeSlider), [n, r] = c.useState(null), a = F(t, (s) => r(s)), i = c.useMemo(
      () => n ? o().findIndex((s) => s.ref.current === n) : -1,
      [o, n]
    );
    return /* @__PURE__ */ l(vw, { ...e, ref: a, index: i });
  }
), vw = c.forwardRef(
  (e, t) => {
    const { __scopeSlider: o, index: n, name: r, ...a } = e, i = Jo(Hn, o), s = sd(Hn, o), [d, f] = c.useState(null), u = F(t, (x) => f(x)), p = d ? i.form || !!d.closest("form") : !0, m = Ft(d), v = i.values[n], h = v === void 0 ? 0 : md(v, i.min, i.max), g = ww(n, i.values.length), b = m?.[s.size], w = b ? yw(b, h, s.direction) : 0;
    return c.useEffect(() => {
      if (d)
        return i.thumbs.add(d), () => {
          i.thumbs.delete(d);
        };
    }, [d, i.thumbs]), /* @__PURE__ */ K(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [s.startEdge]: `calc(${h}% + ${w}px)`
        },
        children: [
          /* @__PURE__ */ l(Vn.ItemSlot, { scope: e.__scopeSlider, children: /* @__PURE__ */ l(
            k.span,
            {
              role: "slider",
              "aria-label": e["aria-label"] || g,
              "aria-valuemin": i.min,
              "aria-valuenow": v,
              "aria-valuemax": i.max,
              "aria-orientation": i.orientation,
              "data-orientation": i.orientation,
              "data-disabled": i.disabled ? "" : void 0,
              tabIndex: i.disabled ? void 0 : 0,
              ...a,
              ref: u,
              style: v === void 0 ? { display: "none" } : e.style,
              onFocus: _(e.onFocus, () => {
                i.valueIndexToChangeRef.current = n;
              })
            }
          ) }),
          p && /* @__PURE__ */ l(
            pd,
            {
              name: r ?? (i.name ? i.name + (i.values.length > 1 ? "[]" : "") : void 0),
              form: i.form,
              value: v
            },
            n
          )
        ]
      }
    );
  }
);
fd.displayName = Hn;
var hw = "RadioBubbleInput", pd = c.forwardRef(
  ({ __scopeSlider: e, value: t, ...o }, n) => {
    const r = c.useRef(null), a = F(r, n), i = zt(t);
    return c.useEffect(() => {
      const s = r.current;
      if (!s) return;
      const d = window.HTMLInputElement.prototype, u = Object.getOwnPropertyDescriptor(d, "value").set;
      if (i !== t && u) {
        const p = new Event("input", { bubbles: !0 });
        u.call(s, t), s.dispatchEvent(p);
      }
    }, [i, t]), /* @__PURE__ */ l(
      k.input,
      {
        style: { display: "none" },
        ...o,
        ref: a,
        defaultValue: t
      }
    );
  }
);
pd.displayName = hw;
function bw(e = [], t, o) {
  const n = [...e];
  return n[o] = t, n.sort((r, a) => r - a);
}
function md(e, t, o) {
  const a = 100 / (o - t) * (e - t);
  return Mt(a, [0, 100]);
}
function ww(e, t) {
  return t > 2 ? `Value ${e + 1} of ${t}` : t === 2 ? ["Minimum", "Maximum"][e] : void 0;
}
function xw(e, t) {
  if (e.length === 1) return 0;
  const o = e.map((r) => Math.abs(r - t)), n = Math.min(...o);
  return o.indexOf(n);
}
function yw(e, t, o) {
  const n = e / 2, a = Br([0, 50], [0, n]);
  return (n - a(t) * o) * o;
}
function Cw(e) {
  return e.slice(0, -1).map((t, o) => e[o + 1] - t);
}
function Sw(e, t) {
  if (t > 0) {
    const o = Cw(e);
    return Math.min(...o) >= t;
  }
  return !0;
}
function Br(e, t) {
  return (o) => {
    if (e[0] === e[1] || t[0] === t[1]) return t[0];
    const n = (t[1] - t[0]) / (e[1] - e[0]);
    return t[0] + n * (o - e[0]);
  };
}
function Rw(e) {
  return (String(e).split(".")[1] || "").length;
}
function Ew(e, t) {
  const o = Math.pow(10, t);
  return Math.round(e * o) / o;
}
var Pw = ad, _w = dd, Aw = ud, Nw = fd, en = "Switch", [Tw, Jx] = te(en), [kw, Iw] = Tw(en), gd = c.forwardRef(
  (e, t) => {
    const {
      __scopeSwitch: o,
      name: n,
      checked: r,
      defaultChecked: a,
      required: i,
      disabled: s,
      value: d = "on",
      onCheckedChange: f,
      form: u,
      ...p
    } = e, [m, v] = c.useState(null), h = F(t, (y) => v(y)), g = c.useRef(!1), b = m ? u || !!m.closest("form") : !0, [w, x] = ae({
      prop: r,
      defaultProp: a ?? !1,
      onChange: f,
      caller: en
    });
    return /* @__PURE__ */ K(kw, { scope: o, checked: w, disabled: s, children: [
      /* @__PURE__ */ l(
        k.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": w,
          "aria-required": i,
          "data-state": wd(w),
          "data-disabled": s ? "" : void 0,
          disabled: s,
          value: d,
          ...p,
          ref: h,
          onClick: _(e.onClick, (y) => {
            x((S) => !S), b && (g.current = y.isPropagationStopped(), g.current || y.stopPropagation());
          })
        }
      ),
      b && /* @__PURE__ */ l(
        bd,
        {
          control: m,
          bubbles: !g.current,
          name: n,
          value: d,
          checked: w,
          required: i,
          disabled: s,
          form: u,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
gd.displayName = en;
var vd = "SwitchThumb", hd = c.forwardRef(
  (e, t) => {
    const { __scopeSwitch: o, ...n } = e, r = Iw(vd, o);
    return /* @__PURE__ */ l(
      k.span,
      {
        "data-state": wd(r.checked),
        "data-disabled": r.disabled ? "" : void 0,
        ...n,
        ref: t
      }
    );
  }
);
hd.displayName = vd;
var Mw = "SwitchBubbleInput", bd = c.forwardRef(
  ({
    __scopeSwitch: e,
    control: t,
    checked: o,
    bubbles: n = !0,
    ...r
  }, a) => {
    const i = c.useRef(null), s = F(i, a), d = zt(o), f = Ft(t);
    return c.useEffect(() => {
      const u = i.current;
      if (!u) return;
      const p = window.HTMLInputElement.prototype, v = Object.getOwnPropertyDescriptor(
        p,
        "checked"
      ).set;
      if (d !== o && v) {
        const h = new Event("click", { bubbles: n });
        v.call(u, o), u.dispatchEvent(h);
      }
    }, [d, o, n]), /* @__PURE__ */ l(
      "input",
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: o,
        ...r,
        tabIndex: -1,
        ref: s,
        style: {
          ...r.style,
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
bd.displayName = Mw;
function wd(e) {
  return e ? "checked" : "unchecked";
}
var Dw = gd, Ow = hd, tn = "Tabs", [Lw, ey] = te(tn, [
  Ue
]), xd = Ue(), [$w, Vr] = Lw(tn), yd = c.forwardRef(
  (e, t) => {
    const {
      __scopeTabs: o,
      value: n,
      onValueChange: r,
      defaultValue: a,
      orientation: i = "horizontal",
      dir: s,
      activationMode: d = "automatic",
      ...f
    } = e, u = Le(s), [p, m] = ae({
      prop: n,
      onChange: r,
      defaultProp: a ?? "",
      caller: tn
    });
    return /* @__PURE__ */ l(
      $w,
      {
        scope: o,
        baseId: de(),
        value: p,
        onValueChange: m,
        orientation: i,
        dir: u,
        activationMode: d,
        children: /* @__PURE__ */ l(
          k.div,
          {
            dir: u,
            "data-orientation": i,
            ...f,
            ref: t
          }
        )
      }
    );
  }
);
yd.displayName = tn;
var Cd = "TabsList", Sd = c.forwardRef(
  (e, t) => {
    const { __scopeTabs: o, loop: n = !0, ...r } = e, a = Vr(Cd, o), i = xd(o);
    return /* @__PURE__ */ l(
      Fo,
      {
        asChild: !0,
        ...i,
        orientation: a.orientation,
        dir: a.dir,
        loop: n,
        children: /* @__PURE__ */ l(
          k.div,
          {
            role: "tablist",
            "aria-orientation": a.orientation,
            ...r,
            ref: t
          }
        )
      }
    );
  }
);
Sd.displayName = Cd;
var Rd = "TabsTrigger", Ed = c.forwardRef(
  (e, t) => {
    const { __scopeTabs: o, value: n, disabled: r = !1, ...a } = e, i = Vr(Rd, o), s = xd(o), d = Ad(i.baseId, n), f = Nd(i.baseId, n), u = n === i.value;
    return /* @__PURE__ */ l(
      Bo,
      {
        asChild: !0,
        ...s,
        focusable: !r,
        active: u,
        children: /* @__PURE__ */ l(
          k.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": u,
            "aria-controls": f,
            "data-state": u ? "active" : "inactive",
            "data-disabled": r ? "" : void 0,
            disabled: r,
            id: d,
            ...a,
            ref: t,
            onMouseDown: _(e.onMouseDown, (p) => {
              !r && p.button === 0 && p.ctrlKey === !1 ? i.onValueChange(n) : p.preventDefault();
            }),
            onKeyDown: _(e.onKeyDown, (p) => {
              [" ", "Enter"].includes(p.key) && i.onValueChange(n);
            }),
            onFocus: _(e.onFocus, () => {
              const p = i.activationMode !== "manual";
              !u && !r && p && i.onValueChange(n);
            })
          }
        )
      }
    );
  }
);
Ed.displayName = Rd;
var Pd = "TabsContent", _d = c.forwardRef(
  (e, t) => {
    const { __scopeTabs: o, value: n, forceMount: r, children: a, ...i } = e, s = Vr(Pd, o), d = Ad(s.baseId, n), f = Nd(s.baseId, n), u = n === s.value, p = c.useRef(u);
    return c.useEffect(() => {
      const m = requestAnimationFrame(() => p.current = !1);
      return () => cancelAnimationFrame(m);
    }, []), /* @__PURE__ */ l(oe, { present: r || u, children: ({ present: m }) => /* @__PURE__ */ l(
      k.div,
      {
        "data-state": u ? "active" : "inactive",
        "data-orientation": s.orientation,
        role: "tabpanel",
        "aria-labelledby": d,
        hidden: !m,
        id: f,
        tabIndex: 0,
        ...i,
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
_d.displayName = Pd;
function Ad(e, t) {
  return `${e}-trigger-${t}`;
}
function Nd(e, t) {
  return `${e}-content-${t}`;
}
var zw = yd, Fw = Sd, Bw = Ed, Vw = _d, Td = "Toggle", Gr = c.forwardRef((e, t) => {
  const { pressed: o, defaultPressed: n, onPressedChange: r, ...a } = e, [i, s] = ae({
    prop: o,
    onChange: r,
    defaultProp: n ?? !1,
    caller: Td
  });
  return /* @__PURE__ */ l(
    k.button,
    {
      type: "button",
      "aria-pressed": i,
      "data-state": i ? "on" : "off",
      "data-disabled": e.disabled ? "" : void 0,
      ...a,
      ref: t,
      onClick: _(e.onClick, () => {
        e.disabled || s(!i);
      })
    }
  );
});
Gr.displayName = Td;
var Gw = Gr, qe = "ToggleGroup", [kd, ty] = te(qe, [
  Ue
]), Id = Ue(), Hr = j.forwardRef((e, t) => {
  const { type: o, ...n } = e;
  if (o === "single")
    return /* @__PURE__ */ l(Hw, { ...n, ref: t });
  if (o === "multiple")
    return /* @__PURE__ */ l(Ww, { ...n, ref: t });
  throw new Error(`Missing prop \`type\` expected on \`${qe}\``);
});
Hr.displayName = qe;
var [Md, Dd] = kd(qe), Hw = j.forwardRef((e, t) => {
  const {
    value: o,
    defaultValue: n,
    onValueChange: r = () => {
    },
    ...a
  } = e, [i, s] = ae({
    prop: o,
    defaultProp: n ?? "",
    onChange: r,
    caller: qe
  });
  return /* @__PURE__ */ l(
    Md,
    {
      scope: e.__scopeToggleGroup,
      type: "single",
      value: j.useMemo(() => i ? [i] : [], [i]),
      onItemActivate: s,
      onItemDeactivate: j.useCallback(() => s(""), [s]),
      children: /* @__PURE__ */ l(Od, { ...a, ref: t })
    }
  );
}), Ww = j.forwardRef((e, t) => {
  const {
    value: o,
    defaultValue: n,
    onValueChange: r = () => {
    },
    ...a
  } = e, [i, s] = ae({
    prop: o,
    defaultProp: n ?? [],
    onChange: r,
    caller: qe
  }), d = j.useCallback(
    (u) => s((p = []) => [...p, u]),
    [s]
  ), f = j.useCallback(
    (u) => s((p = []) => p.filter((m) => m !== u)),
    [s]
  );
  return /* @__PURE__ */ l(
    Md,
    {
      scope: e.__scopeToggleGroup,
      type: "multiple",
      value: i,
      onItemActivate: d,
      onItemDeactivate: f,
      children: /* @__PURE__ */ l(Od, { ...a, ref: t })
    }
  );
});
Hr.displayName = qe;
var [Uw, Kw] = kd(qe), Od = j.forwardRef(
  (e, t) => {
    const {
      __scopeToggleGroup: o,
      disabled: n = !1,
      rovingFocus: r = !0,
      orientation: a,
      dir: i,
      loop: s = !0,
      ...d
    } = e, f = Id(o), u = Le(i), p = { role: "group", dir: u, ...d };
    return /* @__PURE__ */ l(Uw, { scope: o, rovingFocus: r, disabled: n, children: r ? /* @__PURE__ */ l(
      Fo,
      {
        asChild: !0,
        ...f,
        orientation: a,
        dir: u,
        loop: s,
        children: /* @__PURE__ */ l(k.div, { ...p, ref: t })
      }
    ) : /* @__PURE__ */ l(k.div, { ...p, ref: t }) });
  }
), Co = "ToggleGroupItem", Ld = j.forwardRef(
  (e, t) => {
    const o = Dd(Co, e.__scopeToggleGroup), n = Kw(Co, e.__scopeToggleGroup), r = Id(e.__scopeToggleGroup), a = o.value.includes(e.value), i = n.disabled || e.disabled, s = { ...e, pressed: a, disabled: i }, d = j.useRef(null);
    return n.rovingFocus ? /* @__PURE__ */ l(
      Bo,
      {
        asChild: !0,
        ...r,
        focusable: !i,
        active: a,
        ref: d,
        children: /* @__PURE__ */ l(Na, { ...s, ref: t })
      }
    ) : /* @__PURE__ */ l(Na, { ...s, ref: t });
  }
);
Ld.displayName = Co;
var Na = j.forwardRef(
  (e, t) => {
    const { __scopeToggleGroup: o, value: n, ...r } = e, a = Dd(Co, o), i = { role: "radio", "aria-checked": e.pressed, "aria-pressed": void 0 }, s = a.type === "single" ? i : void 0;
    return /* @__PURE__ */ l(
      Gr,
      {
        ...s,
        ...r,
        ref: t,
        onPressedChange: (d) => {
          d ? a.onItemActivate(n) : a.onItemDeactivate(n);
        }
      }
    );
  }
), jw = Hr, Yw = Ld, [on, oy] = te("Tooltip", [
  Te
]), nn = Te(), $d = "TooltipProvider", Xw = 700, Wn = "tooltip.open", [qw, Wr] = on($d), zd = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: o = Xw,
    skipDelayDuration: n = 300,
    disableHoverableContent: r = !1,
    children: a
  } = e, i = c.useRef(!0), s = c.useRef(!1), d = c.useRef(0);
  return c.useEffect(() => {
    const f = d.current;
    return () => window.clearTimeout(f);
  }, []), /* @__PURE__ */ l(
    qw,
    {
      scope: t,
      isOpenDelayedRef: i,
      delayDuration: o,
      onOpen: c.useCallback(() => {
        window.clearTimeout(d.current), i.current = !1;
      }, []),
      onClose: c.useCallback(() => {
        window.clearTimeout(d.current), d.current = window.setTimeout(
          () => i.current = !0,
          n
        );
      }, [n]),
      isPointerInTransitRef: s,
      onPointerInTransitChange: c.useCallback((f) => {
        s.current = f;
      }, []),
      disableHoverableContent: r,
      children: a
    }
  );
};
zd.displayName = $d;
var Dt = "Tooltip", [Zw, Yt] = on(Dt), Fd = (e) => {
  const {
    __scopeTooltip: t,
    children: o,
    open: n,
    defaultOpen: r,
    onOpenChange: a,
    disableHoverableContent: i,
    delayDuration: s
  } = e, d = Wr(Dt, e.__scopeTooltip), f = nn(t), [u, p] = c.useState(null), m = de(), v = c.useRef(0), h = i ?? d.disableHoverableContent, g = s ?? d.delayDuration, b = c.useRef(!1), [w, x] = ae({
    prop: n,
    defaultProp: r ?? !1,
    onChange: (A) => {
      A ? (d.onOpen(), document.dispatchEvent(new CustomEvent(Wn))) : d.onClose(), a?.(A);
    },
    caller: Dt
  }), y = c.useMemo(() => w ? b.current ? "delayed-open" : "instant-open" : "closed", [w]), S = c.useCallback(() => {
    window.clearTimeout(v.current), v.current = 0, b.current = !1, x(!0);
  }, [x]), R = c.useCallback(() => {
    window.clearTimeout(v.current), v.current = 0, x(!1);
  }, [x]), T = c.useCallback(() => {
    window.clearTimeout(v.current), v.current = window.setTimeout(() => {
      b.current = !0, x(!0), v.current = 0;
    }, g);
  }, [g, x]);
  return c.useEffect(() => () => {
    v.current && (window.clearTimeout(v.current), v.current = 0);
  }, []), /* @__PURE__ */ l(Ct, { ...f, children: /* @__PURE__ */ l(
    Zw,
    {
      scope: t,
      contentId: m,
      open: w,
      stateAttribute: y,
      trigger: u,
      onTriggerChange: p,
      onTriggerEnter: c.useCallback(() => {
        d.isOpenDelayedRef.current ? T() : S();
      }, [d.isOpenDelayedRef, T, S]),
      onTriggerLeave: c.useCallback(() => {
        h ? R() : (window.clearTimeout(v.current), v.current = 0);
      }, [R, h]),
      onOpen: S,
      onClose: R,
      disableHoverableContent: h,
      children: o
    }
  ) });
};
Fd.displayName = Dt;
var Un = "TooltipTrigger", Bd = c.forwardRef(
  (e, t) => {
    const { __scopeTooltip: o, ...n } = e, r = Yt(Un, o), a = Wr(Un, o), i = nn(o), s = c.useRef(null), d = F(t, s, r.onTriggerChange), f = c.useRef(!1), u = c.useRef(!1), p = c.useCallback(() => f.current = !1, []);
    return c.useEffect(() => () => document.removeEventListener("pointerup", p), [p]), /* @__PURE__ */ l(St, { asChild: !0, ...i, children: /* @__PURE__ */ l(
      k.button,
      {
        "aria-describedby": r.open ? r.contentId : void 0,
        "data-state": r.stateAttribute,
        ...n,
        ref: d,
        onPointerMove: _(e.onPointerMove, (m) => {
          m.pointerType !== "touch" && !u.current && !a.isPointerInTransitRef.current && (r.onTriggerEnter(), u.current = !0);
        }),
        onPointerLeave: _(e.onPointerLeave, () => {
          r.onTriggerLeave(), u.current = !1;
        }),
        onPointerDown: _(e.onPointerDown, () => {
          r.open && r.onClose(), f.current = !0, document.addEventListener("pointerup", p, { once: !0 });
        }),
        onFocus: _(e.onFocus, () => {
          f.current || r.onOpen();
        }),
        onBlur: _(e.onBlur, r.onClose),
        onClick: _(e.onClick, r.onClose)
      }
    ) });
  }
);
Bd.displayName = Un;
var Ur = "TooltipPortal", [Qw, Jw] = on(Ur, {
  forceMount: void 0
}), Vd = (e) => {
  const { __scopeTooltip: t, forceMount: o, children: n, container: r } = e, a = Yt(Ur, t);
  return /* @__PURE__ */ l(Qw, { scope: t, forceMount: o, children: /* @__PURE__ */ l(oe, { present: o || a.open, children: /* @__PURE__ */ l(rt, { asChild: !0, container: r, children: n }) }) });
};
Vd.displayName = Ur;
var ht = "TooltipContent", Gd = c.forwardRef(
  (e, t) => {
    const o = Jw(ht, e.__scopeTooltip), { forceMount: n = o.forceMount, side: r = "top", ...a } = e, i = Yt(ht, e.__scopeTooltip);
    return /* @__PURE__ */ l(oe, { present: n || i.open, children: i.disableHoverableContent ? /* @__PURE__ */ l(Hd, { side: r, ...a, ref: t }) : /* @__PURE__ */ l(ex, { side: r, ...a, ref: t }) });
  }
), ex = c.forwardRef((e, t) => {
  const o = Yt(ht, e.__scopeTooltip), n = Wr(ht, e.__scopeTooltip), r = c.useRef(null), a = F(t, r), [i, s] = c.useState(null), { trigger: d, onClose: f } = o, u = r.current, { onPointerInTransitChange: p } = n, m = c.useCallback(() => {
    s(null), p(!1);
  }, [p]), v = c.useCallback(
    (h, g) => {
      const b = h.currentTarget, w = { x: h.clientX, y: h.clientY }, x = rx(w, b.getBoundingClientRect()), y = ax(w, x), S = ix(g.getBoundingClientRect()), R = lx([...y, ...S]);
      s(R), p(!0);
    },
    [p]
  );
  return c.useEffect(() => () => m(), [m]), c.useEffect(() => {
    if (d && u) {
      const h = (b) => v(b, u), g = (b) => v(b, d);
      return d.addEventListener("pointerleave", h), u.addEventListener("pointerleave", g), () => {
        d.removeEventListener("pointerleave", h), u.removeEventListener("pointerleave", g);
      };
    }
  }, [d, u, v, m]), c.useEffect(() => {
    if (i) {
      const h = (g) => {
        const b = g.target, w = { x: g.clientX, y: g.clientY }, x = d?.contains(b) || u?.contains(b), y = !sx(w, i);
        x ? m() : y && (m(), f());
      };
      return document.addEventListener("pointermove", h), () => document.removeEventListener("pointermove", h);
    }
  }, [d, u, i, f, m]), /* @__PURE__ */ l(Hd, { ...e, ref: a });
}), [tx, ox] = on(Dt, { isInside: !1 }), nx = /* @__PURE__ */ qa("TooltipContent"), Hd = c.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: o,
      children: n,
      "aria-label": r,
      onEscapeKeyDown: a,
      onPointerDownOutside: i,
      ...s
    } = e, d = Yt(ht, o), f = nn(o), { onClose: u } = d;
    return c.useEffect(() => (document.addEventListener(Wn, u), () => document.removeEventListener(Wn, u)), [u]), c.useEffect(() => {
      if (d.trigger) {
        const p = (m) => {
          m.target?.contains(d.trigger) && u();
        };
        return window.addEventListener("scroll", p, { capture: !0 }), () => window.removeEventListener("scroll", p, { capture: !0 });
      }
    }, [d.trigger, u]), /* @__PURE__ */ l(
      nt,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: a,
        onPointerDownOutside: i,
        onFocusOutside: (p) => p.preventDefault(),
        onDismiss: u,
        children: /* @__PURE__ */ K(
          Vt,
          {
            "data-state": d.stateAttribute,
            ...f,
            ...s,
            ref: t,
            style: {
              ...s.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ l(nx, { children: n }),
              /* @__PURE__ */ l(tx, { scope: o, isInside: !0, children: /* @__PURE__ */ l(of, { id: d.contentId, role: "tooltip", children: r || n }) })
            ]
          }
        )
      }
    );
  }
);
Gd.displayName = ht;
var Wd = "TooltipArrow", Ud = c.forwardRef(
  (e, t) => {
    const { __scopeTooltip: o, ...n } = e, r = nn(o);
    return ox(
      Wd,
      o
    ).isInside ? null : /* @__PURE__ */ l(Gt, { ...r, ...n, ref: t });
  }
);
Ud.displayName = Wd;
function rx(e, t) {
  const o = Math.abs(t.top - e.y), n = Math.abs(t.bottom - e.y), r = Math.abs(t.right - e.x), a = Math.abs(t.left - e.x);
  switch (Math.min(o, n, r, a)) {
    case a:
      return "left";
    case r:
      return "right";
    case o:
      return "top";
    case n:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function ax(e, t, o = 5) {
  const n = [];
  switch (t) {
    case "top":
      n.push(
        { x: e.x - o, y: e.y + o },
        { x: e.x + o, y: e.y + o }
      );
      break;
    case "bottom":
      n.push(
        { x: e.x - o, y: e.y - o },
        { x: e.x + o, y: e.y - o }
      );
      break;
    case "left":
      n.push(
        { x: e.x + o, y: e.y - o },
        { x: e.x + o, y: e.y + o }
      );
      break;
    case "right":
      n.push(
        { x: e.x - o, y: e.y - o },
        { x: e.x - o, y: e.y + o }
      );
      break;
  }
  return n;
}
function ix(e) {
  const { top: t, right: o, bottom: n, left: r } = e;
  return [
    { x: r, y: t },
    { x: o, y: t },
    { x: o, y: n },
    { x: r, y: n }
  ];
}
function sx(e, t) {
  const { x: o, y: n } = e;
  let r = !1;
  for (let a = 0, i = t.length - 1; a < t.length; i = a++) {
    const s = t[a], d = t[i], f = s.x, u = s.y, p = d.x, m = d.y;
    u > n != m > n && o < (p - f) * (n - u) / (m - u) + f && (r = !r);
  }
  return r;
}
function lx(e) {
  const t = e.slice();
  return t.sort((o, n) => o.x < n.x ? -1 : o.x > n.x ? 1 : o.y < n.y ? -1 : o.y > n.y ? 1 : 0), cx(t);
}
function cx(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (; t.length >= 2; ) {
      const a = t[t.length - 1], i = t[t.length - 2];
      if ((a.x - i.x) * (r.y - i.y) >= (a.y - i.y) * (r.x - i.x)) t.pop();
      else break;
    }
    t.push(r);
  }
  t.pop();
  const o = [];
  for (let n = e.length - 1; n >= 0; n--) {
    const r = e[n];
    for (; o.length >= 2; ) {
      const a = o[o.length - 1], i = o[o.length - 2];
      if ((a.x - i.x) * (r.y - i.y) >= (a.y - i.y) * (r.x - i.x)) o.pop();
      else break;
    }
    o.push(r);
  }
  return o.pop(), t.length === 1 && o.length === 1 && t[0].x === o[0].x && t[0].y === o[0].y ? t : t.concat(o);
}
var dx = zd, ux = Fd, fx = Bd, px = Vd, mx = Gd, gx = Ud;
function ny({
  ...e
}) {
  return /* @__PURE__ */ l(Nf, { "data-slot": "accordion", ...e });
}
function ry({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Tf,
    {
      "data-slot": "accordion-item",
      className: C("border-b last:border-b-0", e),
      ...t
    }
  );
}
function ay({
  className: e,
  children: t,
  ...o
}) {
  return /* @__PURE__ */ l(kf, { className: "flex", children: /* @__PURE__ */ K(
    If,
    {
      "data-slot": "accordion-trigger",
      className: C(
        "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
        e
      ),
      ...o,
      children: [
        t,
        /* @__PURE__ */ l(Ro, { className: "pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200" })
      ]
    }
  ) });
}
function iy({
  className: e,
  children: t,
  ...o
}) {
  return /* @__PURE__ */ l(
    Mf,
    {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ...o,
      children: /* @__PURE__ */ l("div", { className: C("pt-0 pb-4", e), children: t })
    }
  );
}
const Ta = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, ka = Da, we = (e, t) => (o) => {
  var n;
  if (t?.variants == null) return ka(e, o?.class, o?.className);
  const { variants: r, defaultVariants: a } = t, i = Object.keys(r).map((f) => {
    const u = o?.[f], p = a?.[f];
    if (u === null) return null;
    const m = Ta(u) || Ta(p);
    return r[f][m];
  }), s = o && Object.entries(o).reduce((f, u) => {
    let [p, m] = u;
    return m === void 0 || (f[p] = m), f;
  }, {}), d = t == null || (n = t.compoundVariants) === null || n === void 0 ? void 0 : n.reduce((f, u) => {
    let { class: p, className: m, ...v } = u;
    return Object.entries(v).every((h) => {
      let [g, b] = h;
      return Array.isArray(b) ? b.includes({
        ...a,
        ...s
      }[g]) : {
        ...a,
        ...s
      }[g] === b;
    }) ? [
      ...f,
      p,
      m
    ] : f;
  }, []);
  return ka(e, i, d, o?.class, o?.className);
}, vx = we(
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
function sy({
  className: e,
  variant: t,
  ...o
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: C(vx({ variant: t }), e),
      ...o
    }
  );
}
function ly({ className: e, ...t }) {
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
function cy({
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
const Kd = we(
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
function rn({
  className: e,
  variant: t = "default",
  size: o = "default",
  asChild: n = !1,
  ...r
}) {
  return /* @__PURE__ */ l(
    n ? Po : "button",
    {
      "data-slot": "button",
      "data-variant": t,
      "data-size": o,
      className: C(Kd({ variant: t, size: o, className: e })),
      ...r
    }
  );
}
function dy({
  ...e
}) {
  return /* @__PURE__ */ l(em, { "data-slot": "alert-dialog", ...e });
}
function uy({
  ...e
}) {
  return /* @__PURE__ */ l(tm, { "data-slot": "alert-dialog-trigger", ...e });
}
function hx({
  ...e
}) {
  return /* @__PURE__ */ l(om, { "data-slot": "alert-dialog-portal", ...e });
}
function bx({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    nm,
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
function fy({
  className: e,
  size: t = "default",
  ...o
}) {
  return /* @__PURE__ */ K(hx, { children: [
    /* @__PURE__ */ l(bx, {}),
    /* @__PURE__ */ l(
      rm,
      {
        "data-slot": "alert-dialog-content",
        "data-size": t,
        className: C(
          "group/alert-dialog-content fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 data-[size=sm]:max-w-xs data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[size=default]:sm:max-w-lg",
          e
        ),
        ...o
      }
    )
  ] });
}
function py({
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
function my({
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
function gy({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    sm,
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
function vy({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    lm,
    {
      "data-slot": "alert-dialog-description",
      className: C("text-sm text-muted-foreground", e),
      ...t
    }
  );
}
function hy({
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
function by({
  className: e,
  variant: t = "default",
  size: o = "default",
  ...n
}) {
  return /* @__PURE__ */ l(rn, { variant: t, size: o, asChild: !0, children: /* @__PURE__ */ l(
    am,
    {
      "data-slot": "alert-dialog-action",
      className: C(e),
      ...n
    }
  ) });
}
function wy({
  className: e,
  variant: t = "outline",
  size: o = "default",
  ...n
}) {
  return /* @__PURE__ */ l(rn, { variant: t, size: o, asChild: !0, children: /* @__PURE__ */ l(
    im,
    {
      "data-slot": "alert-dialog-cancel",
      className: C(e),
      ...n
    }
  ) });
}
function xy({
  ...e
}) {
  return /* @__PURE__ */ l(dm, { "data-slot": "aspect-ratio", ...e });
}
function yy({
  className: e,
  size: t = "default",
  ...o
}) {
  return /* @__PURE__ */ l(
    xm,
    {
      "data-slot": "avatar",
      "data-size": t,
      className: C(
        "group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6",
        e
      ),
      ...o
    }
  );
}
function Cy({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    ym,
    {
      "data-slot": "avatar-image",
      className: C("aspect-square size-full", e),
      ...t
    }
  );
}
function Sy({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Cm,
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
const wx = we(
  "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90",
        outline: "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 [a&]:hover:underline"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Ry({
  className: e,
  variant: t = "default",
  asChild: o = !1,
  ...n
}) {
  return /* @__PURE__ */ l(
    o ? Po : "span",
    {
      "data-slot": "badge",
      "data-variant": t,
      className: C(wx({ variant: t }), e),
      ...n
    }
  );
}
function Ey({ ...e }) {
  return /* @__PURE__ */ l("nav", { "aria-label": "breadcrumb", "data-slot": "breadcrumb", ...e });
}
function Py({ className: e, ...t }) {
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
function _y({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "li",
    {
      "data-slot": "breadcrumb-item",
      className: C("inline-flex items-center gap-1.5", e),
      ...t
    }
  );
}
function Ay({
  asChild: e,
  className: t,
  ...o
}) {
  return /* @__PURE__ */ l(
    e ? Po : "a",
    {
      "data-slot": "breadcrumb-link",
      className: C("transition-colors hover:text-foreground", t),
      ...o
    }
  );
}
function Ny({ className: e, ...t }) {
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
function Ty({
  children: e,
  className: t,
  ...o
}) {
  return /* @__PURE__ */ l(
    "li",
    {
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      "aria-hidden": "true",
      className: C("[&>svg]:size-3.5", t),
      ...o,
      children: e ?? /* @__PURE__ */ l(Yn, {})
    }
  );
}
function ky({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ K(
    "span",
    {
      "data-slot": "breadcrumb-ellipsis",
      role: "presentation",
      "aria-hidden": "true",
      className: C("flex size-9 items-center justify-center", e),
      ...t,
      children: [
        /* @__PURE__ */ l(ja, { className: "size-4" }),
        /* @__PURE__ */ l("span", { className: "sr-only", children: "More" })
      ]
    }
  );
}
function jd({
  className: e,
  orientation: t = "horizontal",
  decorative: o = !0,
  ...n
}) {
  return /* @__PURE__ */ l(
    dw,
    {
      "data-slot": "separator",
      decorative: o,
      orientation: t,
      className: C(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        e
      ),
      ...n
    }
  );
}
const xx = we(
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
function Iy({
  className: e,
  orientation: t,
  ...o
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": t,
      className: C(xx({ orientation: t }), e),
      ...o
    }
  );
}
function My({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "card",
      className: C(
        "flex flex-col gap-6 rounded-xl border bg-card py-6 text-card-foreground shadow-sm",
        e
      ),
      ...t
    }
  );
}
function Dy({ className: e, ...t }) {
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
function Oy({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "card-title",
      className: C("leading-none font-semibold", e),
      ...t
    }
  );
}
function Ly({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "card-description",
      className: C("text-sm text-muted-foreground", e),
      ...t
    }
  );
}
function $y({ className: e, ...t }) {
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
function zy({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "card-content",
      className: C("px-6", e),
      ...t
    }
  );
}
function Fy({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "card-footer",
      className: C("flex items-center px-6 [.border-t]:pt-6", e),
      ...t
    }
  );
}
function By({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    us,
    {
      "data-slot": "checkbox",
      className: C(
        "peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30 dark:aria-invalid:ring-destructive/40 dark:data-[state=checked]:bg-primary",
        e
      ),
      ...t,
      children: /* @__PURE__ */ l(
        ps,
        {
          "data-slot": "checkbox-indicator",
          className: "grid place-content-center text-current transition-none",
          children: /* @__PURE__ */ l(jn, { className: "size-3.5" })
        }
      )
    }
  );
}
function Vy({
  ...e
}) {
  return /* @__PURE__ */ l(ni, { "data-slot": "collapsible", ...e });
}
function Gy({
  ...e
}) {
  return /* @__PURE__ */ l(
    qn,
    {
      "data-slot": "collapsible-trigger",
      ...e
    }
  );
}
function Hy({
  ...e
}) {
  return /* @__PURE__ */ l(
    Qn,
    {
      "data-slot": "collapsible-content",
      ...e
    }
  );
}
function Wy({
  ...e
}) {
  return /* @__PURE__ */ l(ir, { "data-slot": "dialog", ...e });
}
function Uy({
  ...e
}) {
  return /* @__PURE__ */ l(sr, { "data-slot": "dialog-trigger", ...e });
}
function yx({
  ...e
}) {
  return /* @__PURE__ */ l(lr, { "data-slot": "dialog-portal", ...e });
}
function Ky({
  ...e
}) {
  return /* @__PURE__ */ l(at, { "data-slot": "dialog-close", ...e });
}
function Cx({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    cr,
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
function jy({
  className: e,
  children: t,
  showCloseButton: o = !0,
  ...n
}) {
  return /* @__PURE__ */ K(yx, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ l(Cx, {}),
    /* @__PURE__ */ K(
      dr,
      {
        "data-slot": "dialog-content",
        className: C(
          "fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 sm:max-w-lg",
          e
        ),
        ...n,
        children: [
          t,
          o && /* @__PURE__ */ K(
            at,
            {
              "data-slot": "dialog-close",
              className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ l(Ya, {}),
                /* @__PURE__ */ l("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function Yy({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "dialog-header",
      className: C("flex flex-col gap-2 text-center sm:text-left", e),
      ...t
    }
  );
}
function Xy({
  className: e,
  showCloseButton: t = !1,
  children: o,
  ...n
}) {
  return /* @__PURE__ */ K(
    "div",
    {
      "data-slot": "dialog-footer",
      className: C(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        e
      ),
      ...n,
      children: [
        o,
        t && /* @__PURE__ */ l(at, { asChild: !0, children: /* @__PURE__ */ l(rn, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function qy({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    ur,
    {
      "data-slot": "dialog-title",
      className: C("text-lg leading-none font-semibold", e),
      ...t
    }
  );
}
function Zy({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    fr,
    {
      "data-slot": "dialog-description",
      className: C("text-sm text-muted-foreground", e),
      ...t
    }
  );
}
function Qy({
  ...e
}) {
  return /* @__PURE__ */ l(ih, { "data-slot": "dropdown-menu", ...e });
}
function Jy({
  ...e
}) {
  return /* @__PURE__ */ l(kl, { "data-slot": "dropdown-menu-portal", ...e });
}
function eC({
  ...e
}) {
  return /* @__PURE__ */ l(
    sh,
    {
      "data-slot": "dropdown-menu-trigger",
      ...e
    }
  );
}
function tC({
  className: e,
  sideOffset: t = 4,
  ...o
}) {
  return /* @__PURE__ */ l(kl, { children: /* @__PURE__ */ l(
    lh,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: t,
      className: C(
        "z-50 max-h-(--radix-dropdown-menu-content-available-height) min-w-[8rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        e
      ),
      ...o
    }
  ) });
}
function oC({
  ...e
}) {
  return /* @__PURE__ */ l(ch, { "data-slot": "dropdown-menu-group", ...e });
}
function nC({
  className: e,
  inset: t,
  variant: o = "default",
  ...n
}) {
  return /* @__PURE__ */ l(
    uh,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": t,
      "data-variant": o,
      className: C(
        "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-[variant=destructive]:*:[svg]:text-destructive!",
        e
      ),
      ...n
    }
  );
}
function rC({
  className: e,
  children: t,
  checked: o,
  ...n
}) {
  return /* @__PURE__ */ K(
    fh,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      className: C(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      checked: o,
      ...n,
      children: [
        /* @__PURE__ */ l("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ l(Il, { children: /* @__PURE__ */ l(jn, { className: "size-4" }) }) }),
        t
      ]
    }
  );
}
function aC({
  ...e
}) {
  return /* @__PURE__ */ l(
    ph,
    {
      "data-slot": "dropdown-menu-radio-group",
      ...e
    }
  );
}
function iC({
  className: e,
  children: t,
  ...o
}) {
  return /* @__PURE__ */ K(
    mh,
    {
      "data-slot": "dropdown-menu-radio-item",
      className: C(
        "relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        e
      ),
      ...o,
      children: [
        /* @__PURE__ */ l("span", { className: "pointer-events-none absolute left-2 flex size-3.5 items-center justify-center", children: /* @__PURE__ */ l(Il, { children: /* @__PURE__ */ l(Ka, { className: "size-2 fill-current" }) }) }),
        t
      ]
    }
  );
}
function sC({
  className: e,
  inset: t,
  ...o
}) {
  return /* @__PURE__ */ l(
    dh,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": t,
      className: C(
        "px-2 py-1.5 text-sm font-medium data-[inset]:pl-8",
        e
      ),
      ...o
    }
  );
}
function lC({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    gh,
    {
      "data-slot": "dropdown-menu-separator",
      className: C("-mx-1 my-1 h-px bg-border", e),
      ...t
    }
  );
}
function cC({
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
function dC({
  ...e
}) {
  return /* @__PURE__ */ l(vh, { "data-slot": "dropdown-menu-sub", ...e });
}
function uC({
  className: e,
  inset: t,
  children: o,
  ...n
}) {
  return /* @__PURE__ */ K(
    hh,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": t,
      className: C(
        "flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[inset]:pl-8 data-[state=open]:bg-accent data-[state=open]:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        e
      ),
      ...n,
      children: [
        o,
        /* @__PURE__ */ l(Yn, { className: "ml-auto size-4" })
      ]
    }
  );
}
function fC({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    bh,
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
function pC({ className: e, ...t }) {
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
function mC({ className: e, ...t }) {
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
const Sx = we(
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
function gC({
  className: e,
  variant: t = "default",
  ...o
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": t,
      className: C(Sx({ variant: t, className: e })),
      ...o
    }
  );
}
function vC({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "empty-title",
      className: C("text-lg font-medium tracking-tight", e),
      ...t
    }
  );
}
function hC({ className: e, ...t }) {
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
function bC({ className: e, ...t }) {
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
function Rx({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    xh,
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
function wC({ className: e, ...t }) {
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
function xC({
  className: e,
  variant: t = "legend",
  ...o
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
      ...o
    }
  );
}
function yC({ className: e, ...t }) {
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
const Ex = we(
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
function CC({
  className: e,
  orientation: t = "vertical",
  ...o
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      role: "group",
      "data-slot": "field",
      "data-orientation": t,
      className: C(Ex({ orientation: t }), e),
      ...o
    }
  );
}
function SC({ className: e, ...t }) {
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
function RC({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Rx,
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
function EC({ className: e, ...t }) {
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
function PC({ className: e, ...t }) {
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
function _C({
  children: e,
  className: t,
  ...o
}) {
  return /* @__PURE__ */ K(
    "div",
    {
      "data-slot": "field-separator",
      "data-content": !!e,
      className: C(
        "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
        t
      ),
      ...o,
      children: [
        /* @__PURE__ */ l(jd, { className: "absolute inset-0 top-1/2" }),
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
function AC({
  className: e,
  children: t,
  errors: o,
  ...n
}) {
  const r = Jd(() => {
    if (t)
      return t;
    if (!o?.length)
      return null;
    const a = [
      ...new Map(o.map((i) => [i?.message, i])).values()
    ];
    return a?.length == 1 ? a[0]?.message : /* @__PURE__ */ l("ul", { className: "ml-4 flex list-disc flex-col gap-1", children: a.map(
      (i, s) => i?.message && /* @__PURE__ */ l("li", { children: i.message }, s)
    ) });
  }, [t, o]);
  return r ? /* @__PURE__ */ l(
    "div",
    {
      role: "alert",
      "data-slot": "field-error",
      className: C("text-sm font-normal text-destructive", e),
      ...n,
      children: r
    }
  ) : null;
}
function NC({
  ...e
}) {
  return /* @__PURE__ */ l(Ah, { "data-slot": "hover-card", ...e });
}
function TC({
  ...e
}) {
  return /* @__PURE__ */ l(Nh, { "data-slot": "hover-card-trigger", ...e });
}
function kC({
  className: e,
  align: t = "center",
  sideOffset: o = 4,
  ...n
}) {
  return /* @__PURE__ */ l(Th, { "data-slot": "hover-card-portal", children: /* @__PURE__ */ l(
    kh,
    {
      "data-slot": "hover-card-content",
      align: t,
      sideOffset: o,
      className: C(
        "z-50 w-64 origin-(--radix-hover-card-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        e
      ),
      ...n
    }
  ) });
}
function Px({ className: e, type: t, ...o }) {
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
      ...o
    }
  );
}
function _x({ className: e, ...t }) {
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
function IC({ className: e, ...t }) {
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
const Ax = we(
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
function MC({
  className: e,
  align: t = "inline-start",
  ...o
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      role: "group",
      "data-slot": "input-group-addon",
      "data-align": t,
      className: C(Ax({ align: t }), e),
      onClick: (n) => {
        n.target.closest("button") || n.currentTarget.parentElement?.querySelector("input")?.focus();
      },
      ...o
    }
  );
}
const Nx = we(
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
function DC({
  className: e,
  type: t = "button",
  variant: o = "ghost",
  size: n = "xs",
  ...r
}) {
  return /* @__PURE__ */ l(
    rn,
    {
      type: t,
      "data-size": n,
      variant: o,
      className: C(Nx({ size: n }), e),
      ...r
    }
  );
}
function OC({ className: e, ...t }) {
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
function LC({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Px,
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
function $C({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    _x,
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
function zC({ className: e, ...t }) {
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
function FC({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    jd,
    {
      "data-slot": "item-separator",
      orientation: "horizontal",
      className: C("my-0", e),
      ...t
    }
  );
}
const Tx = we(
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
function BC({
  className: e,
  variant: t = "default",
  size: o = "default",
  asChild: n = !1,
  ...r
}) {
  return /* @__PURE__ */ l(
    n ? Po : "div",
    {
      "data-slot": "item",
      "data-variant": t,
      "data-size": o,
      className: C(Tx({ variant: t, size: o, className: e })),
      ...r
    }
  );
}
const kx = we(
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
function VC({
  className: e,
  variant: t = "default",
  ...o
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "item-media",
      "data-variant": t,
      className: C(kx({ variant: t, className: e })),
      ...o
    }
  );
}
function GC({ className: e, ...t }) {
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
function HC({ className: e, ...t }) {
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
function WC({ className: e, ...t }) {
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
function UC({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "item-actions",
      className: C("flex items-center gap-2", e),
      ...t
    }
  );
}
function KC({ className: e, ...t }) {
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
function jC({ className: e, ...t }) {
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
function YC({ className: e, ...t }) {
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
function XC({
  className: e,
  size: t = "default",
  ...o
}) {
  return /* @__PURE__ */ K(
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
            ...o
          }
        ),
        /* @__PURE__ */ l(
          Ro,
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
function qC({ ...e }) {
  return /* @__PURE__ */ l("option", { "data-slot": "native-select-option", ...e });
}
function ZC({
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
function QC({ className: e, ...t }) {
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
function JC({
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
function eS({ ...e }) {
  return /* @__PURE__ */ l("li", { "data-slot": "pagination-item", ...e });
}
function Yd({
  className: e,
  isActive: t,
  size: o = "icon",
  ...n
}) {
  return /* @__PURE__ */ l(
    "a",
    {
      "aria-current": t ? "page" : void 0,
      "data-slot": "pagination-link",
      "data-active": t,
      className: C(
        Kd({
          variant: t ? "outline" : "ghost",
          size: o
        }),
        e
      ),
      ...n
    }
  );
}
function tS({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ K(
    Yd,
    {
      "aria-label": "Go to previous page",
      size: "default",
      className: C("gap-1 px-2.5 sm:pl-2.5", e),
      ...t,
      children: [
        /* @__PURE__ */ l(Vu, {}),
        /* @__PURE__ */ l("span", { className: "hidden sm:block", children: "Previous" })
      ]
    }
  );
}
function oS({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ K(
    Yd,
    {
      "aria-label": "Go to next page",
      size: "default",
      className: C("gap-1 px-2.5 sm:pr-2.5", e),
      ...t,
      children: [
        /* @__PURE__ */ l("span", { className: "hidden sm:block", children: "Next" }),
        /* @__PURE__ */ l(Yn, {})
      ]
    }
  );
}
function nS({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ K(
    "span",
    {
      "aria-hidden": !0,
      "data-slot": "pagination-ellipsis",
      className: C("flex size-9 items-center justify-center", e),
      ...t,
      children: [
        /* @__PURE__ */ l(ja, { className: "size-4" }),
        /* @__PURE__ */ l("span", { className: "sr-only", children: "More pages" })
      ]
    }
  );
}
function rS({
  ...e
}) {
  return /* @__PURE__ */ l(Gh, { "data-slot": "popover", ...e });
}
function aS({
  ...e
}) {
  return /* @__PURE__ */ l(Hh, { "data-slot": "popover-trigger", ...e });
}
function iS({
  className: e,
  align: t = "center",
  sideOffset: o = 4,
  ...n
}) {
  return /* @__PURE__ */ l(Wh, { children: /* @__PURE__ */ l(
    Uh,
    {
      "data-slot": "popover-content",
      align: t,
      sideOffset: o,
      className: C(
        "z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        e
      ),
      ...n
    }
  ) });
}
function sS({
  className: e,
  value: t,
  ...o
}) {
  return /* @__PURE__ */ l(
    Qh,
    {
      "data-slot": "progress",
      className: C(
        "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
        e
      ),
      ...o,
      children: /* @__PURE__ */ l(
        Jh,
        {
          "data-slot": "progress-indicator",
          className: "h-full w-full flex-1 bg-primary transition-all",
          style: { transform: `translateX(-${100 - (t || 0)}%)` }
        }
      )
    }
  );
}
function lS({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    cb,
    {
      "data-slot": "radio-group",
      className: C("grid gap-3", e),
      ...t
    }
  );
}
function cS({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    db,
    {
      "data-slot": "radio-group-item",
      className: C(
        "aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        e
      ),
      ...t,
      children: /* @__PURE__ */ l(
        ub,
        {
          "data-slot": "radio-group-indicator",
          className: "relative flex items-center justify-center",
          children: /* @__PURE__ */ l(Ka, { className: "absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-primary" })
        }
      )
    }
  );
}
function dS({
  className: e,
  children: t,
  ...o
}) {
  return /* @__PURE__ */ K(
    Sb,
    {
      "data-slot": "scroll-area",
      className: C("relative", e),
      ...o,
      children: [
        /* @__PURE__ */ l(
          Rb,
          {
            "data-slot": "scroll-area-viewport",
            className: "size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1",
            children: t
          }
        ),
        /* @__PURE__ */ l(Ix, {}),
        /* @__PURE__ */ l(Eb, {})
      ]
    }
  );
}
function Ix({
  className: e,
  orientation: t = "vertical",
  ...o
}) {
  return /* @__PURE__ */ l(
    vc,
    {
      "data-slot": "scroll-area-scrollbar",
      orientation: t,
      className: C(
        "flex touch-none p-px transition-colors select-none",
        t === "vertical" && "h-full w-2.5 border-l border-l-transparent",
        t === "horizontal" && "h-2.5 flex-col border-t border-t-transparent",
        e
      ),
      ...o,
      children: /* @__PURE__ */ l(
        xc,
        {
          "data-slot": "scroll-area-thumb",
          className: "relative flex-1 rounded-full bg-border"
        }
      )
    }
  );
}
function uS({
  ...e
}) {
  return /* @__PURE__ */ l(Kb, { "data-slot": "select", ...e });
}
function fS({
  ...e
}) {
  return /* @__PURE__ */ l(Jb, { "data-slot": "select-group", ...e });
}
function pS({
  ...e
}) {
  return /* @__PURE__ */ l(Yb, { "data-slot": "select-value", ...e });
}
function mS({
  className: e,
  size: t = "default",
  children: o,
  ...n
}) {
  return /* @__PURE__ */ K(
    jb,
    {
      "data-slot": "select-trigger",
      "data-size": t,
      className: C(
        "flex w-fit items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
        e
      ),
      ...n,
      children: [
        o,
        /* @__PURE__ */ l(Xb, { asChild: !0, children: /* @__PURE__ */ l(Ro, { className: "size-4 opacity-50" }) })
      ]
    }
  );
}
function gS({
  className: e,
  children: t,
  position: o = "item-aligned",
  align: n = "center",
  ...r
}) {
  return /* @__PURE__ */ l(qb, { children: /* @__PURE__ */ K(
    Zb,
    {
      "data-slot": "select-content",
      className: C(
        "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        o === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        e
      ),
      position: o,
      align: n,
      ...r,
      children: [
        /* @__PURE__ */ l(Mx, {}),
        /* @__PURE__ */ l(
          Qb,
          {
            className: C(
              "p-1",
              o === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
            ),
            children: t
          }
        ),
        /* @__PURE__ */ l(Dx, {})
      ]
    }
  ) });
}
function vS({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    ew,
    {
      "data-slot": "select-label",
      className: C("px-2 py-1.5 text-xs text-muted-foreground", e),
      ...t
    }
  );
}
function hS({
  className: e,
  children: t,
  ...o
}) {
  return /* @__PURE__ */ K(
    tw,
    {
      "data-slot": "select-item",
      className: C(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        e
      ),
      ...o,
      children: [
        /* @__PURE__ */ l(
          "span",
          {
            "data-slot": "select-item-indicator",
            className: "absolute right-2 flex size-3.5 items-center justify-center",
            children: /* @__PURE__ */ l(nw, { children: /* @__PURE__ */ l(jn, { className: "size-4" }) })
          }
        ),
        /* @__PURE__ */ l(ow, { children: t })
      ]
    }
  );
}
function bS({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    iw,
    {
      "data-slot": "select-separator",
      className: C("pointer-events-none -mx-1 my-1 h-px bg-border", e),
      ...t
    }
  );
}
function Mx({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    rw,
    {
      "data-slot": "select-scroll-up-button",
      className: C(
        "flex cursor-default items-center justify-center py-1",
        e
      ),
      ...t,
      children: /* @__PURE__ */ l(Wu, { className: "size-4" })
    }
  );
}
function Dx({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    aw,
    {
      "data-slot": "select-scroll-down-button",
      className: C(
        "flex cursor-default items-center justify-center py-1",
        e
      ),
      ...t,
      children: /* @__PURE__ */ l(Ro, { className: "size-4" })
    }
  );
}
function wS({ ...e }) {
  return /* @__PURE__ */ l(ir, { "data-slot": "sheet", ...e });
}
function xS({
  ...e
}) {
  return /* @__PURE__ */ l(sr, { "data-slot": "sheet-trigger", ...e });
}
function yS({
  ...e
}) {
  return /* @__PURE__ */ l(at, { "data-slot": "sheet-close", ...e });
}
function Ox({
  ...e
}) {
  return /* @__PURE__ */ l(lr, { "data-slot": "sheet-portal", ...e });
}
function Lx({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    cr,
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
function CS({
  className: e,
  children: t,
  side: o = "right",
  showCloseButton: n = !0,
  ...r
}) {
  return /* @__PURE__ */ K(Ox, { children: [
    /* @__PURE__ */ l(Lx, {}),
    /* @__PURE__ */ K(
      dr,
      {
        "data-slot": "sheet-content",
        className: C(
          "fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-500",
          o === "right" && "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
          o === "left" && "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
          o === "top" && "inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
          o === "bottom" && "inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          e
        ),
        ...r,
        children: [
          t,
          n && /* @__PURE__ */ K(at, { className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
            /* @__PURE__ */ l(Ya, { className: "size-4" }),
            /* @__PURE__ */ l("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function SS({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "sheet-header",
      className: C("flex flex-col gap-1.5 p-4", e),
      ...t
    }
  );
}
function RS({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "sheet-footer",
      className: C("mt-auto flex flex-col gap-2 p-4", e),
      ...t
    }
  );
}
function ES({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    ur,
    {
      "data-slot": "sheet-title",
      className: C("font-semibold text-foreground", e),
      ...t
    }
  );
}
function PS({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    fr,
    {
      "data-slot": "sheet-description",
      className: C("text-sm text-muted-foreground", e),
      ...t
    }
  );
}
function _S({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "div",
    {
      "data-slot": "skeleton",
      className: C("animate-pulse rounded-md bg-accent", e),
      ...t
    }
  );
}
function AS({
  className: e,
  defaultValue: t,
  value: o,
  min: n = 0,
  max: r = 100,
  ...a
}) {
  const i = c.useMemo(
    () => Array.isArray(o) ? o : Array.isArray(t) ? t : [n, r],
    [o, t, n, r]
  );
  return /* @__PURE__ */ K(
    Pw,
    {
      "data-slot": "slider",
      defaultValue: t,
      value: o,
      min: n,
      max: r,
      className: C(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        e
      ),
      ...a,
      children: [
        /* @__PURE__ */ l(
          _w,
          {
            "data-slot": "slider-track",
            className: C(
              "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
            ),
            children: /* @__PURE__ */ l(
              Aw,
              {
                "data-slot": "slider-range",
                className: C(
                  "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
                )
              }
            )
          }
        ),
        Array.from({ length: i.length }, (s, d) => /* @__PURE__ */ l(
          Nw,
          {
            "data-slot": "slider-thumb",
            className: "block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          },
          d
        ))
      ]
    }
  );
}
function NS({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    Yu,
    {
      role: "status",
      "aria-label": "Loading",
      className: C("size-4 animate-spin", e),
      ...t
    }
  );
}
function TS({
  className: e,
  size: t = "default",
  ...o
}) {
  return /* @__PURE__ */ l(
    Dw,
    {
      "data-slot": "switch",
      "data-size": t,
      className: C(
        "peer group/switch inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-[1.15rem] data-[size=default]:w-8 data-[size=sm]:h-3.5 data-[size=sm]:w-6 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
        e
      ),
      ...o,
      children: /* @__PURE__ */ l(
        Ow,
        {
          "data-slot": "switch-thumb",
          className: C(
            "pointer-events-none block rounded-full bg-background ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground dark:data-[state=unchecked]:bg-foreground"
          )
        }
      )
    }
  );
}
function kS({ className: e, ...t }) {
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
function IS({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "thead",
    {
      "data-slot": "table-header",
      className: C("[&_tr]:border-b", e),
      ...t
    }
  );
}
function MS({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "tbody",
    {
      "data-slot": "table-body",
      className: C("[&_tr:last-child]:border-0", e),
      ...t
    }
  );
}
function DS({ className: e, ...t }) {
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
function OS({ className: e, ...t }) {
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
function LS({ className: e, ...t }) {
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
function $S({ className: e, ...t }) {
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
function zS({
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
function FS({
  className: e,
  orientation: t = "horizontal",
  ...o
}) {
  return /* @__PURE__ */ l(
    zw,
    {
      "data-slot": "tabs",
      "data-orientation": t,
      orientation: t,
      className: C(
        "group/tabs flex gap-2 data-[orientation=horizontal]:flex-col",
        e
      ),
      ...o
    }
  );
}
const $x = we(
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
function BS({
  className: e,
  variant: t = "default",
  ...o
}) {
  return /* @__PURE__ */ l(
    Fw,
    {
      "data-slot": "tabs-list",
      "data-variant": t,
      className: C($x({ variant: t }), e),
      ...o
    }
  );
}
function VS({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Bw,
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
function GS({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ l(
    Vw,
    {
      "data-slot": "tabs-content",
      className: C("flex-1 outline-none", e),
      ...t
    }
  );
}
const Xd = we(
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
function HS({
  className: e,
  variant: t,
  size: o,
  ...n
}) {
  return /* @__PURE__ */ l(
    Gw,
    {
      "data-slot": "toggle",
      className: C(Xd({ variant: t, size: o, className: e })),
      ...n
    }
  );
}
const qd = c.createContext({
  size: "default",
  variant: "default",
  spacing: 0
});
function WS({
  className: e,
  variant: t,
  size: o,
  spacing: n = 0,
  children: r,
  ...a
}) {
  return /* @__PURE__ */ l(
    jw,
    {
      "data-slot": "toggle-group",
      "data-variant": t,
      "data-size": o,
      "data-spacing": n,
      style: { "--gap": n },
      className: C(
        "group/toggle-group flex w-fit items-center gap-[--spacing(var(--gap))] rounded-md data-[spacing=default]:data-[variant=outline]:shadow-xs",
        e
      ),
      ...a,
      children: /* @__PURE__ */ l(qd.Provider, { value: { variant: t, size: o, spacing: n }, children: r })
    }
  );
}
function US({
  className: e,
  children: t,
  variant: o,
  size: n,
  ...r
}) {
  const a = c.useContext(qd);
  return /* @__PURE__ */ l(
    Yw,
    {
      "data-slot": "toggle-group-item",
      "data-variant": a.variant || o,
      "data-size": a.size || n,
      "data-spacing": a.spacing,
      className: C(
        Xd({
          variant: a.variant || o,
          size: a.size || n
        }),
        "w-auto min-w-0 shrink-0 px-3 focus:z-10 focus-visible:z-10",
        "data-[spacing=0]:rounded-none data-[spacing=0]:shadow-none data-[spacing=0]:first:rounded-l-md data-[spacing=0]:last:rounded-r-md data-[spacing=0]:data-[variant=outline]:border-l-0 data-[spacing=0]:data-[variant=outline]:first:border-l",
        e
      ),
      ...r,
      children: t
    }
  );
}
function KS({
  delayDuration: e = 0,
  ...t
}) {
  return /* @__PURE__ */ l(
    dx,
    {
      "data-slot": "tooltip-provider",
      delayDuration: e,
      ...t
    }
  );
}
function jS({
  ...e
}) {
  return /* @__PURE__ */ l(ux, { "data-slot": "tooltip", ...e });
}
function YS({
  ...e
}) {
  return /* @__PURE__ */ l(fx, { "data-slot": "tooltip-trigger", ...e });
}
function XS({
  className: e,
  sideOffset: t = 0,
  children: o,
  ...n
}) {
  return /* @__PURE__ */ l(px, { children: /* @__PURE__ */ K(
    mx,
    {
      "data-slot": "tooltip-content",
      sideOffset: t,
      className: C(
        "z-50 w-fit origin-(--radix-tooltip-content-transform-origin) animate-in rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        e
      ),
      ...n,
      children: [
        o,
        /* @__PURE__ */ l(gx, { className: "z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground" })
      ]
    }
  ) });
}
export {
  ny as Accordion,
  iy as AccordionContent,
  ry as AccordionItem,
  ay as AccordionTrigger,
  sy as Alert,
  cy as AlertDescription,
  dy as AlertDialog,
  by as AlertDialogAction,
  wy as AlertDialogCancel,
  fy as AlertDialogContent,
  vy as AlertDialogDescription,
  my as AlertDialogFooter,
  py as AlertDialogHeader,
  hy as AlertDialogMedia,
  bx as AlertDialogOverlay,
  hx as AlertDialogPortal,
  gy as AlertDialogTitle,
  uy as AlertDialogTrigger,
  ly as AlertTitle,
  xy as AspectRatio,
  yy as Avatar,
  Sy as AvatarFallback,
  Cy as AvatarImage,
  Ry as Badge,
  Ey as Breadcrumb,
  ky as BreadcrumbEllipsis,
  _y as BreadcrumbItem,
  Ay as BreadcrumbLink,
  Py as BreadcrumbList,
  Ny as BreadcrumbPage,
  Ty as BreadcrumbSeparator,
  rn as Button,
  Iy as ButtonGroup,
  My as Card,
  $y as CardAction,
  zy as CardContent,
  Ly as CardDescription,
  Fy as CardFooter,
  Dy as CardHeader,
  Oy as CardTitle,
  By as Checkbox,
  Vy as Collapsible,
  Hy as CollapsibleContent,
  Gy as CollapsibleTrigger,
  Wy as Dialog,
  Ky as DialogClose,
  jy as DialogContent,
  Zy as DialogDescription,
  Xy as DialogFooter,
  Yy as DialogHeader,
  Cx as DialogOverlay,
  yx as DialogPortal,
  qy as DialogTitle,
  Uy as DialogTrigger,
  Qy as DropdownMenu,
  rC as DropdownMenuCheckboxItem,
  tC as DropdownMenuContent,
  oC as DropdownMenuGroup,
  nC as DropdownMenuItem,
  sC as DropdownMenuLabel,
  Jy as DropdownMenuPortal,
  aC as DropdownMenuRadioGroup,
  iC as DropdownMenuRadioItem,
  lC as DropdownMenuSeparator,
  cC as DropdownMenuShortcut,
  dC as DropdownMenuSub,
  fC as DropdownMenuSubContent,
  uC as DropdownMenuSubTrigger,
  eC as DropdownMenuTrigger,
  pC as Empty,
  bC as EmptyContent,
  hC as EmptyDescription,
  mC as EmptyHeader,
  gC as EmptyMedia,
  vC as EmptyTitle,
  CC as Field,
  SC as FieldContent,
  PC as FieldDescription,
  AC as FieldError,
  yC as FieldGroup,
  RC as FieldLabel,
  xC as FieldLegend,
  _C as FieldSeparator,
  wC as FieldSet,
  EC as FieldTitle,
  NC as HoverCard,
  kC as HoverCardContent,
  TC as HoverCardTrigger,
  Px as Input,
  IC as InputGroup,
  MC as InputGroupAddon,
  DC as InputGroupButton,
  LC as InputGroupInput,
  OC as InputGroupText,
  $C as InputGroupTextarea,
  BC as Item,
  UC as ItemActions,
  GC as ItemContent,
  WC as ItemDescription,
  jC as ItemFooter,
  zC as ItemGroup,
  KC as ItemHeader,
  VC as ItemMedia,
  FC as ItemSeparator,
  HC as ItemTitle,
  YC as Kbd,
  Rx as Label,
  XC as NativeSelect,
  ZC as NativeSelectOptGroup,
  qC as NativeSelectOption,
  QC as Pagination,
  JC as PaginationContent,
  nS as PaginationEllipsis,
  eS as PaginationItem,
  Yd as PaginationLink,
  oS as PaginationNext,
  tS as PaginationPrevious,
  rS as Popover,
  iS as PopoverContent,
  aS as PopoverTrigger,
  sS as Progress,
  lS as RadioGroup,
  cS as RadioGroupItem,
  dS as ScrollArea,
  Ix as ScrollBar,
  uS as Select,
  gS as SelectContent,
  fS as SelectGroup,
  hS as SelectItem,
  vS as SelectLabel,
  Dx as SelectScrollDownButton,
  Mx as SelectScrollUpButton,
  bS as SelectSeparator,
  mS as SelectTrigger,
  pS as SelectValue,
  jd as Separator,
  wS as Sheet,
  yS as SheetClose,
  CS as SheetContent,
  PS as SheetDescription,
  RS as SheetFooter,
  SS as SheetHeader,
  ES as SheetTitle,
  xS as SheetTrigger,
  _S as Skeleton,
  AS as Slider,
  NS as Spinner,
  TS as Switch,
  kS as Table,
  MS as TableBody,
  zS as TableCaption,
  $S as TableCell,
  DS as TableFooter,
  LS as TableHead,
  IS as TableHeader,
  OS as TableRow,
  FS as Tabs,
  GS as TabsContent,
  BS as TabsList,
  VS as TabsTrigger,
  _x as Textarea,
  HS as Toggle,
  WS as ToggleGroup,
  US as ToggleGroupItem,
  jS as Tooltip,
  XS as TooltipContent,
  KS as TooltipProvider,
  YS as TooltipTrigger,
  wx as badgeVariants,
  Kd as buttonVariants,
  C as cn,
  $x as tabsListVariants,
  Xd as toggleVariants
};
//# sourceMappingURL=index.mjs.map
