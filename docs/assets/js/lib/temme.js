import { isPromise } from "@eoussama/core";



function G(n, t = [], e = false) {
  try {
    const r = pe(e);

    n.temmeIds = [...t, r], "childNodes" in n && n.childNodes.forEach((o) => { G(o, n.temmeIds); }), "templates" in n && n.templates.forEach((o) => { G(o, n.temmeIds, !0); });
  }
  catch (r) { throw r; }
} function p(n) { return n.temmeIds[n.temmeIds.length - 1]; } function pe(n = false) {
  const t = "0123456789abcdefghijklmnopqrstuvwxyz"; const e = n === false ? 6 : 4; let r = "";

  for (let o = 0; o < e; o++) {
    const a = Math.floor(Math.random() * t.length); const l = Math.floor(Math.random() * 2);

    r += l === 1 ? t[a].toUpperCase() : t[a];
  }

  return r;
} const s = class {
  constructor(t, e, r, o, a = false) { this.label = t, this.type = e, this.values = r, this.default = o, this.inherited = a; } static validateOptionType(t, e) {
    let r = "";

    return Array.isArray(t) ? r = "array" : r = typeof t, { valid: r === e.type, type: r };
  }

  static validateOptionValue(t, e) {
    if (e != null && e.values.length > 0) {
      if (e.label === "include" || e.label === "exclude") {
        for (const r of t) {
          if (!e.values.includes(r)) { return false; }
        }
      }
      else { return e.values.includes(t); }
    }

    return true;
  }
};

s.validateOptionName = t => t != null; const f = class extends s {constructor() { super("ref", "string", [], ""); this.getKeyFromElement = e => null; }inherit(e, r) {}}; const h = class extends s {constructor() { super("name", "string", [], "div", true); this.getKeyFromElement = e => null; }inherit(e, r) { r != null && e.from.mode === "override" && (e.name = r); }}; const w = class extends s {constructor() { super("id", "string", [], "", true); this.getKeyFromElement = e => e.id; }inherit(e, r) { r !== "" && (e.from.mode === "append" ? e.id === "" && (e.id = r) : e.id = r); }parse(e, r) { r.id != "" && (e.id = r.id); }}; const c = class extends s {constructor() { super("value", "string", [], ""); this.getKeyFromElement = e => null; }inherit(e, r) {}}; const u = class extends s {constructor() { super("type", "string", ["text", "html"], "text"); this.getKeyFromElement = e => null; }inherit(e, r) {}}; const H = class extends s {
  constructor() { super("content", "object", [], { type: new u().default, value: new c().default }, true); this.keys = { type: new u(), value: new c() }; }inherit(e, r) {
    let o = r.value;

    r.value !== "" && (e.from.mode === "append" ? o = `${e.content.value}${o.length > 0 ? " " : ""}${o}` : e.content = r, e.content.value = o);
  }

  getKeyFromElement(e) { return { type: "html", value: e.innerHTML }; }parse(e, r) { r.content.value != "" && (r.content.type === "text" ? e.textContent = r.content.value : e.innerHTML = r.content.value); }
}; const I = class extends s {constructor() { super("temmeIds", "array", [], []); this.getKeyFromElement = e => null; }inherit(e, r) {}}; const K = class extends s {constructor() { super("templates", "array", [], []); this.getKeyFromElement = e => null; }inherit(e, r) {}}; const M = class extends s {
  constructor() { super("classes", "array", [], [], true); }inherit(t, e) { t.from.mode === "append" ? t.classes.push(...e) : t.classes = e, t.classes = t.classes.filter((r, o) => t.classes.indexOf(r) === o), t.classes.sort(); }getKeyFromElement(t) {
    const e = [];

    return t.classList.forEach(r => e.push(r)), e;
  }

  parse(t, e) { e.classes.length > 0 && t.classList.add(...e.classes); }
}; const A = class extends s {
  constructor() { super("childNodes", "array", [], [], true); this.getKeyFromElement = e => e.innerHTML; }inherit(e, r) {
    let o = [...e.childNodes];

    e.from.children.allow === true && (e.from.mode === "append" ? e.from.children.placement === "before" ? o.unshift(...r) : o.push(...r) : o = r), e.childNodes = o;
  }
}; const L = class extends s {
  constructor() { super("attributes", "object", [], {}, true); }inherit(t, e) {
    const r = { ...e };

    if (t.from.mode === "append") {
      for (const o in t.attributes) { r[o] = t.attributes[o]; }
    }
    else {
      for (const o in t.attributes) { o in r || (r[o] = t.attributes[o]); }
    }t.attributes = r;
  }

  getKeyFromElement(t) {
    const e = {};

    for (const r in t.attributes) { !isNaN(Number.parseInt(r)) && !["id", "class"].includes(t.attributes[r].nodeName) && t.attributes[r].nodeName.substring(0, 5) !== "data-" && (e[t.attributes[r].nodeName] = t.attributes[r].nodeValue); }

    return e;
  }

  parse(t, e) { for (const r in e.attributes) { t.setAttribute(r, e.attributes[r]); } }
}; const R = class extends s {
  constructor() { super("dataset", "object", [], {}, true); }inherit(t, e) {
    const r = { ...e };

    if (t.from.mode === "append") {
      for (const o in t.dataset) { r[o] = t.dataset[o]; }
    }
    else {
      for (const o in t.dataset) { o in r || (r[o] = t.dataset[o]); }
    }t.dataset = r;
  }

  getKeyFromElement(t) {
    const e = {};

    for (const r in t.dataset) { e[r] = t.dataset[r]; }

    return e;
  }

  parse(t, e) { for (const r in e.dataset) { t.dataset[r] = e.dataset[r]; } }
}; const d = class extends s {constructor() { super("mode", "string", ["append", "override"], "append"); this.getKeyFromElement = e => null; }inherit(e, r) {}}; const y = class extends s {constructor() { super("placement", "string", ["after", "before"], "after"); this.getKeyFromElement = e => null; }inherit(e, r) {}}; const g = class extends s {constructor() { super("allow", "boolean", [], false); this.getKeyFromElement = e => null; }inherit(e, r) {}}; const b = class extends s {constructor() { super("children", "object", [], { allow: new g().default, placement: new y().default }); this.keys = { allow: new g(), placement: new y() }; this.getKeyFromElement = e => null; }inherit(e, r) {}}; const v = class extends s {constructor() { super("include", "array", ["name", "id", "classes", "attributes", "dataset", "content", "childNodes"], ["name", "id", "classes", "attributes", "dataset", "content", "childNodes"]); this.getKeyFromElement = e => null; }inherit(e, r) {}}; const O = class extends s {constructor() { super("exclude", "array", ["name", "id", "classes", "attributes", "dataset", "content", "childNodes"], []); this.getKeyFromElement = e => null; }inherit(e, r) {}}; const N = class extends s {constructor() { super("from", "object", [], { ref: new f().default, mode: new d().default, children: new b().default, include: new v().default, exclude: new O().default }); this.keys = { ref: new f(), mode: new d(), children: new b(), include: new v(), exclude: new O() }; this.getKeyFromElement = e => null; }inherit(e, r) {}}; const m = [new f(), new h(), new w(), new H(), new I(), new K(), new M(), new A(), new L(), new R(), new N()]; const ce = ue(); const J = ["name", "childNodes", "templates"];

function ne(n) {
  const t = [];

  return ce.forEach((e) => {
    if ("keys" in e && e.label === n) {
      for (const r in e.keys) {
        const o = e.keys[r];

        t.push(o);
      }
    }
  }), t;
} function ue() {
  let n = [];

  return m.forEach((t) => {
    if (n.push(t), "keys" in t) {
      const e = re(t);

      n = n.concat(e);
    }
  }), n;
} function re(n) {
  let t = [];

  for (const e in n.keys) {
    const r = n.keys[e];

    if (t.push(r), "keys" in r) {
      const o = re(r);

      t = t.concat(o);
    }
  }

  return t;
} function Y(n, t, e, r = false) {
  try {
    const o = de(n, t, r);

    e(p(n), n), "childNodes" in n && n.childNodes.length > 0 && n.childNodes.forEach((a) => { Y(a, o, e); });
  }
  catch (o) { throw o; }
} function de(n, t, e = false) {
  try {
    const r = e === !0 ? t : document.createElement(n.name);

    return m.forEach((o) => { typeof o.parse == "function" && o.parse(r, n); }), e === !1 && t.appendChild(r), r;
  }
  catch (r) { throw r; }
} const i = class extends Error {constructor(e) { super(); this.name = "TemmyError"; this.message = "Temme isn't feeling good"; this.message = e.length > 0 ? e : this.message; }}; const k = class extends i {
  constructor(e) {
    super(""); this.name = "InvalidTemplateOptionError"; this.message = "A template has an invalid option"; const r = `\u201C${e}\u201D is not a valid option to use in templates`;

    this.message = e.length > 0 ? r : this.message;
  }
}; const F = class extends i {
  constructor(e) {
    super(""); this.name = "InvalidOptionNameError"; this.message = "An option is not valid"; const r = `\u201C${e}\u201D is not a valid option`;

    this.message = e.length > 0 ? r : this.message;
  }
}; const P = class extends i {
  constructor(e, r) {
    super(""); this.name = "InvalidOptionTypeError"; this.message = "An option doesn't have a valid value type"; const o = `The \u201C${e}\u201D option doesn't accept values of type \u201C${r}\u201D`;

    this.message = e.length > 0 ? o : this.message;
  }
}; const S = class extends i {
  constructor(e, r) {
    super(""); this.name = "InvalidOptionValueError"; this.message = "An option doesn't have a valid value"; const o = `The \u201C${e}\u201D option doesn't accept \u201C${r}\u201D as a value`;

    this.message = e.length > 0 ? o : this.message;
  }
}; const T = class extends i {
  constructor(e, r) {
    super(""); this.name = "InvalidSubOptionNameError"; this.message = "A sub-option is not valid"; const o = `The \u201C${e}\u201D option doesn't not recognize \u201C${r}\u201D as a valid sub-option`;

    this.message = e.length > 0 || r.length > 0 ? o : this.message;
  }
}; const V = class extends i {
  constructor(e, r) {
    super(""); this.name = "InvalidSubOptionTypeError"; this.message = "A sub-option doesn't have a valid value type"; const o = `The \u201C${e}\u201D sub-option doesn't accept values of type \u201C${r}\u201D`;

    this.message = e.length > 0 || r.length > 0 ? o : this.message;
  }
}; const $ = class extends i {
  constructor(e, r) {
    super(""); this.name = "InvalidSubOptionValueError"; this.message = "A sub-option doesn't have a valid value"; const o = `The \u201C${e}\u201D sub-option doesn't accept \u201C${r}\u201D as a value`;

    this.message = e.length > 0 || r.length > 0 ? o : this.message;
  }
}; const E = class extends i {constructor(e) { super(""); this.name = "InvalidReferencingOptionError"; this.message = "A referencing option is not valid"; this.message = e.length > 0 ? e : this.message; }}; const x = class extends i {constructor(e) { super(""); this.name = "InvalidReferenceOptionValueError"; this.message = "\u201Cref\u201D options must not begin with the \u201C@\u201D symbol"; this.message = e.length > 0 ? e : this.message; }}; const j = class extends i {constructor(e) { super(""); this.name = "InvalidReferenceError"; this.message = "A reference is invalid"; this.message = e.length > 0 ? `\u201C${e}\u201D is an invalid reference` : this.message; }}; const C = class extends i {constructor(e) { super(""); this.name = "InvalidTemplateError"; this.message = "A template does not have a \u201Cref\u201D option"; this.message = e.length > 0 ? e : this.message; }}; const z = class extends i {
  constructor(e, r) {
    super(""); this.name = "InvalidTemplateReferencingError"; this.message = "Templates can only reference other templates."; const o = `The template with the reference \u201C${e}\u201D is trying to reference \u201C${r}\u201D a non-template object`;

    this.message = e.length > 0 ? o : this.message;
  }
}; const q = class extends i {constructor(e) { super(""); this.name = "ReferenceOutOfScopeError"; this.message = "An object is referencing an element out of its scope"; this.message = e.length > 0 ? e : this.message; }}; const oe = n => n != null && typeof n == "object" && !Array.isArray(n); const se = n => n != null && n instanceof HTMLElement;

function U(n) {
  try {
    for (const t in n) {
      const e = m.filter(a => a.label === t)[0]; const r = n[t];

      if (s.validateOptionName(e) === !1) { throw new F(t); } const o = s.validateOptionType(r, e);

      if (o.valid === !1) { throw new P(t, o.type); } if (s.validateOptionValue(r, e) === !1) { throw new S(t, r); } if ("keys" in e) {
        const a = e.keys;

        ie(t, r, a);
      }
    } if (ve(n) === !1) { throw new E("The \u201Cfrom\u201D option must always have a \u201Cref\u201D sub-option"); } if (Oe(n) === !1) { throw new E("The \u201Cfrom\u201D option can't have both the \u201Cinclude\u201D and \u201Cexclude\u201D sub-options at the same time"); } "templates" in n && n.templates.forEach((t) => { ge(t); }), "childNodes" in n && n.childNodes.forEach((t) => { U(t); });
  }
  catch (t) { throw t; }
} function ge(n) {
  try {
    if (!("ref" in n)) { throw new C(""); } for (const t in n) {
      if (J.includes(t)) { throw new k(t); } U(n);
    }
  }
  catch (t) { throw t; }
} function Q(n, t) {
  try {
    if (n.ref[0] === "@") { throw new x(""); } if (n.from.ref[0] === "@") {
      const e = n.from.ref.substring(1);

      if (document.querySelector(e) == null) { throw new x(`No outer element corresponds to the selector \u201C${e}\u201D`); }
    }
    else if (be(n, t) === !1 && n.from.ref !== "") {
      throw new j(n.from.ref);
    } "childNodes" in n && n.childNodes.length > 0 && n.childNodes.forEach((e) => { Q(e, t); }), "templates" in n && n.templates.length > 0 && n.templates.forEach((e) => { Q(e, t); });
  }
  catch (e) { throw e; }
} var be = (n, t) => t.filter(e => e.hierarchy.ref === n.from.ref && p(n) !== p(e.hierarchy))[0] != null;

function Z(n, t) {
  try {
    const e = n.templates;

    e.length > 0 && e.forEach((r) => {
      if (r.from.ref.length > 0) {
        const o = t.filter(l => l.hierarchy.ref === r.from.ref)[0];

        if (p(o.hierarchy).length === 4 === !1) { throw new z(r.ref, r.from.ref); }
      }
    }), n.childNodes.forEach((r) => { Z(r, t); });
  }
  catch (e) { throw e; }
} function W(n, t, e = 0) {
  try {
    const r = n.from.ref;

    if (e++, r !== "" && r[0] !== "@" && t.filter(a => a.hierarchy.ref === r && e >= a.depth)[0] == null) { throw new q(""); } "childNodes" in n && n.childNodes.length > 0 && n.childNodes.forEach((o) => { W(o, t, e); }), "templates" in n && n.templates.length > 0 && n.templates.forEach((o) => { W(o, t, e); });
  }
  catch (r) { throw r; }
} function ie(n, t, e) {
  for (const r in t) {
    const o = ne(n).filter(l => l.label === r)[0]; const a = t[r];

    if (r in e) {
      if (s.validateOptionName(o) === false) { throw new T(n, r); } const l = s.validateOptionType(a, o);

      if (l.valid === false) { throw new V(r, l.type); } if (s.validateOptionValue(a, o) === false) { throw new $(r, a); } if ("keys" in o) {
        const X = t[r];

        ie(r, X, o.keys);
      }
    }
    else {
      throw new T(n, r);
    }
  }
} function ve(n) { return "from" in n ? "ref" in n.from : true; } function Oe(n) { return "from" in n ? !("include" in n.from && "exclude" in n.from) : true; } function ae(n) {
  try {
    const t = _(n);

    Q(n, t), Z(n, t), W(n, t), le(n, t.filter(e => Ee(e.hierarchy))), me(n, t);
  }
  catch (t) { throw t; }
} var Ee = n => p(n).length === 4;

function le(n, t) {
  try {
    "templates" in n && n.templates.length > 0 && n.templates.forEach((e) => {
      if (e.from.ref !== "") {
        for (const r in e) {
          const o = m.filter(l => l.label === r)[0]; const a = t.filter(l => l.hierarchy.ref === e.from.ref)[0];

          o.inherit(e, a.hierarchy[r]);
        }
      }
    }), "childNodes" in n && n.childNodes.length > 0 && n.childNodes.forEach((e) => { le(e, t); });
  }
  catch (e) { throw e; }
} function me(n, t) {
  try {
    if ("childNodes" in n && n.childNodes.length > 0 && n.childNodes.forEach((e) => { me(e, t); }), n.from.ref !== "") {
      if (n.from.ref[0] === "@") {
        const e = n.from.ref.substring(1); const r = document.querySelector(e);

        for (const o in n) {
          const a = m.filter(X => X.label === o)[0]; const l = a.getKeyFromElement(r);

          l != null && a.inherit(n, l);
        }
      }
      else {
        const e = t.filter(o => o.hierarchy.ref === n.from.ref)[0];

        n.from.include.filter(o => !n.from.exclude.includes(o)).forEach((o) => { m.filter(l => l.label === o)[0].inherit(n, e.hierarchy[o]); });
      }
    }
  }
  catch (e) { throw e; }
} function _(n, t = 0) {
  const e = [];

  return t++, n.ref !== "" && e.push({ depth: t, hierarchy: n }), "childNodes" in n && n.childNodes.length > 0 && n.childNodes.forEach((r) => { e.push(..._(r, t)); }), "templates" in n && n.templates.length > 0 && n.templates.forEach((r) => { e.push(..._(r, t - 1)); }), e;
} function ee(n) {
  try {
    m.forEach((t) => {
      if (!(t.label in n)) {
        n[t.label] = t.default;
      }
      else if ("keys" in t) {
        for (const e in t.keys) {
          const r = t.keys[e];

          te(n[t.label], r);
        }
      }
    }), n.classes = n.classes.filter((t, e) => n.classes.indexOf(t) === e), n.classes.sort(), "childNodes" in n && n.childNodes.length > 0 && n.childNodes.forEach((t) => { ee(t); }), "templates" in n && n.templates.length > 0 && n.templates.forEach((t) => { he(t); });
  }
  catch (t) { throw t; }
} function te(n, t) {
  try {
    if (t.label in n ? (t.label === "include" || t.label === "exclude") && (n[t.label] = n[t.label].filter((e, r) => n[t.label].indexOf(e) === r), n[t.label].sort()) : n[t.label] = t.default, "keys" in t) {
      for (const e in t.keys) {
        const r = n[t.label]; const o = t.keys[e];

        te(r, o);
      }
    }
  }
  catch (e) { throw e; }
} function he(n) {
  try {
    m.filter(t => !J.includes(t.label)).forEach((t) => {
      if (!(t.label in n)) {
        n[t.label] = t.default;
      }
      else if ("keys" in t) {
        for (const e in t.keys) {
          const r = t.keys[e];

          te(n[t.label], r);
        }
      }
    });
  }
  catch (t) { throw t; }
} const B = class extends i {constructor(e) { super(""); this.name = "InvalidHierarchyError"; this.message = "The hierarchy object is not valid"; this.message = e.length > 0 ? e : this.message; }}; const D = class extends i {constructor(e) { super(""); this.name = "InvalidTargetError"; this.message = "The target is not a valid HTML element"; this.message = e.length > 0 ? e : this.message; }};

/**
 *
 * @param n
 * @param t
 * @param e
 * @param r
 */
function Bn(n, t, e = () => {}, r = () => {}) {
  try {
    if (!se(t)) { throw new D(""); } if (!oe(n)) { throw new B(""); } U(n), ee(n), G(n), ae(n), Y(n, t, r, !0); const o = e(n);

    return isPromise(o) && o.catch((a) => { console.warn("[Temme]: async end-callback rejected:", a); }), n;
  }
  catch (o) { throw o.message = `[Temme]: ${o.message}.`, o; }
} /**
   *
   * @param n
   */
function Dn(n) {
  try { return U(n), { valid: !0, error: null }; }
  catch (t) { return { valid: false, error: t }; }
}/**
  *
  * @name:       temmejs
  * @version:    1.0.6
  * @author:     EOussama
  * @license     MIT
  * @source:     https://github.com/EOussama/temmejs
  *
  * Temme (or Emmet in reverse) is to javascript what Emmet is to HTML and CSS,
  * with no doubts, Emmet saved us from the headache of working with HTML and CSS,
  * and now, Temme is doing Javascript the same favour too.
  */export { Bn as parse, Dn as validate };// # sourceMappingURL=temme.js.map
// # sourceMappingURL=temme.js.map
