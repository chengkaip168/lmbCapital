import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function MapSection() {
  const scriptRef = useRef(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { setVisible(entry.isIntersecting); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Run the LMB map interaction script after mount
    const lmb = document.getElementById("lmb");
    if (!lmb) return;

    const svg = lmb.querySelector("svg");
    const tip = svg.querySelector(".lmb-tip");
    const tBg = svg.querySelector(".lmb-tip-bg");
    const tArr = svg.querySelector(".lmb-tip-arrow");
    const tTxt = svg.querySelector(".lmb-tip-text");

    const detail = lmb.querySelector(".lmb-detail");
    const dM = detail.querySelector(".lmb-d-marker");
    const dT = detail.querySelector(".lmb-d-tag");
    const dTi = detail.querySelector(".lmb-d-title");
    const dS = detail.querySelector(".lmb-d-sub");
    const dD = detail.querySelector(".lmb-d-desc");
    const dP = detail.querySelector(".lmb-d-pin");

    const R = {
      "Eastern North Carolina": { t: "s", tag: "COVERAGE AREA", sub: "North Carolina · Charlotte to the coast", desc: "Spans the Charlotte metro east through the Triangle, Triad, and the entire eastern seaboard of North Carolina." },
      "Coastal South Carolina": { t: "s", tag: "COVERAGE AREA", sub: "South Carolina · Greenville to the coast", desc: "Spans the Upstate at Greenville east through the Midlands and along the Charleston-Myrtle Beach coastline." },
      "Los Angeles": { t: "m", tag: "METRO MARKET", sub: "California · Greater Los Angeles", desc: "The largest metropolitan economy on the West Coast." },
      "Dallas": { t: "m", tag: "METRO MARKET", sub: "Texas · Dallas–Fort Worth", desc: "A leading North-Texas growth corridor and corporate-relocation hub." },
      "Northern Houston": { t: "m", tag: "METRO MARKET", sub: "Texas · Greater Houston (north corridor)", desc: "Houston's northern growth corridor — The Woodlands and Spring submarkets." },
      "Southern Atlanta": { t: "m", tag: "METRO MARKET", sub: "Georgia · South Atlanta metro", desc: "Atlanta's southern submarkets — Henry, Clayton, and Fayette county growth corridors." },
    };

    const E = {};
    Object.keys(R).forEach((n) => { E[n] = { m: null, k: null }; });
    svg.querySelectorAll("[data-region]").forEach((el) => {
      const n = el.getAttribute("data-region");
      if (E[n]) E[n].m = el;
    });
    lmb.querySelectorAll(".lmb-card").forEach((el) => {
      const n = el.getAttribute("data-region");
      if (E[n]) E[n].k = el;
    });

    let pinned = null, hovered = null, active = null;

    function setActive(n) {
      if (active === n) return;
      if (active && E[active]) {
        const p = E[active];
        if (p.m) p.m.classList.remove("lmb-on");
        if (p.k) p.k.classList.remove("lmb-on");
      }
      active = n;
      if (n && E[n]) {
        const x = E[n];
        if (x.m) x.m.classList.add("lmb-on");
        if (x.k) x.k.classList.add("lmb-on");
      }
    }

    function showTip(n, e) {
      if (!n) return;
      tTxt.textContent = n;
      const bb = tTxt.getBBox(), w = Math.max(bb.width + 32, 90), h = bb.height + 18;
      tBg.setAttribute("width", w); tBg.setAttribute("height", h);
      tTxt.setAttribute("x", w / 2); tTxt.setAttribute("y", h / 2);
      const a = w / 2;
      tArr.setAttribute("points", `${a},${h + 6} ${a - 7},${h} ${a + 7},${h}`);
      moveTip(e, w, h);
      tip.setAttribute("opacity", "1");
    }
    function moveTip(e, w, h) {
      const p = svg.createSVGPoint();
      p.x = e.clientX; p.y = e.clientY;
      const l = p.matrixTransform(svg.getScreenCTM().inverse());
      w = w || parseFloat(tBg.getAttribute("width"));
      h = h || parseFloat(tBg.getAttribute("height"));
      let x = l.x - w / 2, y = l.y - h - 18;
      x = Math.max(4, Math.min(960 - w - 4, x));
      y = Math.max(4, y);
      tip.setAttribute("transform", `translate(${x},${y})`);
    }
    function hideTip() { tip.setAttribute("opacity", "0"); }

    function upd(n) {
      const i = R[n];
      if (!i) { detail.setAttribute("data-state", "default"); return; }
      dT.textContent = i.tag; dTi.textContent = n; dS.textContent = i.sub; dD.textContent = i.desc;
      dM.className = `lmb-d-marker w-3.5 h-3.5 shrink-0 mt-1.5 rounded-full ${i.t}`;
      detail.setAttribute("data-state", "active");
    }
    function reset() {
      if (pinned) upd(pinned);
      else detail.setAttribute("data-state", "default");
    }
    function pin(n) {
      if (pinned === n) {
        pinned = null; detail.setAttribute("data-pinned", "false");
        setActive(hovered);
        if (hovered) upd(hovered); else reset();
      } else {
        pinned = n; detail.setAttribute("data-pinned", "true");
        setActive(n); upd(n);
      }
    }

    dP.addEventListener("click", () => { const n = dTi.textContent; if (n && R[n]) pin(n); });

    svg.querySelectorAll("[data-region]").forEach((el) => {
      const n = el.getAttribute("data-region");
      el.addEventListener("mouseenter", (e) => { hovered = n; if (!pinned) { setActive(n); upd(n); } showTip(n, e); });
      el.addEventListener("mousemove", moveTip);
      el.addEventListener("mouseleave", () => { hovered = null; if (!pinned) { setActive(null); reset(); } hideTip(); });
      el.addEventListener("click", () => pin(n));
    });

    lmb.querySelectorAll(".lmb-card").forEach((card) => {
      const n = card.getAttribute("data-region");
      card.addEventListener("mouseenter", () => { hovered = n; if (!pinned) { setActive(n); upd(n); } });
      card.addEventListener("mouseleave", () => { hovered = null; if (!pinned) { setActive(null); reset(); } });
      card.addEventListener("click", () => { pin(n); if (window.innerWidth < 880) svg.scrollIntoView({ behavior: "smooth", block: "center" }); });
    });
  }, []);

  return (
    <section id="map" className="bg-primary" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12 py-16 md:py-32">
        <div className="text-center mb-12">
          <p className="font-body text-sm tracking-[0.3em] uppercase text-accent mb-4">Where We Invest</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            Map of the Market
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto mt-4 rounded-full" />
        </div>

        <style>{`
          #lmb, #lmb * { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important; }
          #lmb svg { touch-action: manipulation; user-select: none; -webkit-user-select: none; }
          #lmb svg .lmb-r { cursor: pointer; transition: fill 0.1s, stroke 0.1s; touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
          #lmb svg .lmb-coverage { fill: rgba(212,165,116,0.45); stroke: #d4a574; stroke-width: 1.5; }
          #lmb svg .lmb-coverage:hover, #lmb svg .lmb-coverage.lmb-on { fill: rgba(255,209,102,0.65); stroke: #ffd166; }
          #lmb svg .lmb-city { fill: rgba(212,165,116,0.45); stroke: #d4a574; stroke-width: 1.5; }
          #lmb svg .lmb-city:hover, #lmb svg .lmb-city.lmb-on { fill: rgba(255,209,102,0.65); stroke: #ffd166; }
          #lmb svg .lmb-tip { transition: opacity 0.12s; }
          #lmb .lmb-card:hover, #lmb .lmb-card.lmb-on { background: rgba(212,165,116,0.18); border-color: #d4a574; transform: translateX(3px); }
          #lmb .lmb-d-active { display: none; }
          #lmb .lmb-detail[data-state='active'] .lmb-d-default { display: none; }
          #lmb .lmb-detail[data-state='active'] .lmb-d-active { display: flex; }
          #lmb .lmb-detail[data-pinned='true'] .lmb-d-pin { background: rgba(255,209,102,0.18); border-color: #ffd166; color: #ffd166; }
          #lmb .lmb-detail[data-pinned='true'] .lmb-d-pin-l::after { content: 'ned'; }
          #lmb .lmb-d-pin:hover { background: rgba(212,165,116,0.1); border-color: #ffd166; color: #ffd166; }
          #lmb .lmb-d-marker.s { background: rgba(255,209,102,0.55); border: 2px solid #ffd166; }
          #lmb .lmb-d-marker.m { background: rgba(255,209,102,0.55); border: 2px solid #ffd166; }
          @media (max-width: 880px) { #lmb .lmb-grid { grid-template-columns: 1fr !important; gap: 20px !important; } }
        `}</style>

        <div id="lmb" className="w-full text-white">
          <div className="lmb-grid grid lg:grid-cols-[minmax(0,1.7fr)_minmax(280px,1fr)] gap-4 md:gap-6">
            <motion.div
              className="bg-white/[.03] border border-white/10 rounded-xl p-2 md:p-4"
              initial={{ opacity: 0, x: -60 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <svg viewBox="0 0 960 600" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto block">
                <g fill="none" stroke="#d4a574" strokeWidth="1.5" strokeLinecap="round" opacity=".55" pointerEvents="none">
                  <path d="M10,10H30M10,10V30" /><path d="M950,10H930M950,10V30" /><path d="M10,590H30M10,590V570" /><path d="M950,590H930M950,590V570" />
                </g>
                <g fill="#fff" stroke="#1a3e6a" strokeWidth=".8" strokeLinejoin="round">
                  <path d="M760,439l2,7 4,10 5,10 4,6 5,5 4,4 1,3-1,1-1,2 3,7 3,3 3,5 3,6 5,8 1,8 1,12v2 3l-2,1v2l-1,2 1,3v2l-3,3-3,1h-4l-1,2-2,1h-2l-1-1 0-3-1-4-3-5-4-2h-4l-1,1-3-5 0-3-3-4-2-1-1,2h-2l-2-6-3-3-3-6-3-3-3-4 2-2 3-5 0-2-5-1-1,1h0l3,1-2,5h-1l-1-4-2-5 0-2 2-5 0-10-4-3-1-3-5-2h-2l-2-3-3-2-1-3-3-1-2-4-4-1-3-2h-3l-4,1v2l1,1-1,1h-3l-4,4-3,2h-4l-3,1-1-3-1-2-3-1-2-1-8-4-7-2-5,1h-6l-6,2-3,1-1-8-2-2-2-2 0-3 11-1 25-3 7-1h5l3,4 1,2h9 10l22-2h5 5l1,3 2,1 0-5-1-4 1-2 6,1h5zM772,572l3-1h1l2-3 2-1h1l2,1v1l-3,1-4,1-3,1h-1zM786,567l1,1 3-3 5-4 4-4 2-6 1-2 1-3h-1l-1,3-2,5-3,5-4,4-4,2-2,2z" />
                  <path d="M881,142l1-1 1-3-3-1 0-3-4-1 0-3-8-23-4-15h-1l-1,2-1-1-1-1-1,2v5 6l2,3v4l-3,5-3,1v1l1,2v8l-1,10v5l1,1v4l-1,2 1,1 17-5h2l2-3 4-2z" />
                  <path d="M698,177l-3-8-3-9-2-3-3-2-1,1-4,2-2,5-3,4h-1-1c0,0-3-2-3-3 0,0,1-5,1-5l3-1 1-3 0-3 3-1 0-10-2-3-1-1-1-2h1 1l0-2-2-2-1-3h-3l-4-1-6-3h-3 0-1l-3-3-3,2-3,3v3h1l2,1 1,1h-3l-2,1-2,2v2 1 6l-3,2h-1l0-4 2-3 0-2-1-1-2,1-1,4-2,1-2,2v1 1 2l-2,1v1 2l-1,7-1,4v4l1,1-1,3v1l-1,2 4,6 3,7 1,5-1,4-1,6-2,5v3l-4,3h5l21-2 7-1 1,2 6-2 11-1 4-1h0l0-2 2-3 2-2 0-5 1-2h1l1-4 1-3 1,1v1h1l2-1 0-10zM582,82l1-2 3-1 5-4h2 1l-5,5-4,2-2,1-1-1zM668,114v3h4l1-1c0,0,0-2,0-2-1,0-2-2-2-2h-2l-2,1v1h1zM567,111h1l3-1 4-2 0-1 0-1 6-1 3-2 4-2 0-1 2-3 2-1 1-2 2-2 5-3h4l2,1-1,1-3,1-2,3-2,1-1,2-2,4v2 1l1-1 4-3 1,1h2l4,1 1,1 2,3 2,3h4l2-1 1,1h2 1 1l2-1 4-4 3-1h7l5-2 2-2 2,1v5 1h3 2l6-2 1-1 2,1v7l3,3h1l1,1-1,1-1-1h-3-2-3l-3,2h-2l-6-2-5,1-2,2-7,1-2,1-1,3-1,1h-1l-1-2-5,3h-1l-1-2h-1l-1,4-1,4-4,7-1-1-1-1-2-10-4-1-2-3-12-2-3-1-8-2-8-2-4-5z" />
                  <path d="M844,154l1-5-3-11h-1l-3-2 1-3-1-2-2-4 1-4-1-5-3-7 0-5 26-7v6l2,3v4l-3,5-3,1v1l1,2v8l-1,9v6l1,1v4l-1,2 1,1-7,1-5,1z" />
                  <path d="M923,79l2,2 2,4v2l-2,4-2,1-3,3-5,5c0,0-1,0-2,0 0,0-1-2-1-2l-1,1-1,1-3,1-1,2 2,1-1,1v3h-2l0-2 0-1h-2l-1-3-3,1 2,2v1l-1,1 1,3v2l-2,2-3,1v3l-5,3h-2l-1-1-3,3v4l-1,1v4l-1,6-3-1 0-3-4-1 0-3-8-23-4-15h1l2,1 0-3 1-5 2-4 2-4-2-3 0-6 1-1 1-2-1-2 0-5 2-5 3-8 2-5h1l2,1v1l1,2 3,1 0-1 0-1 5-3 1-2h2l6,3 2,1 9,30h6l1,1v5l3,3h0l1-1-1-1h3zM902,109l1-2 2,1v3l-1,1-2-3zM909,103l1,2c0,0,2,0,2,0 0-1,0-2,0-2l1-1-1-2-2,1-1,2z" />
                  <path d="M874,179l-4-15 7-2 2,2 3,4 3,5-3,1h-1l-2,2-2,2-3,1z" />
                  <path d="M830,189l-1-1h-2l-3-2-1-6h-4l-2-3-20,4-43,9-7,1-1-6 2-1 1-1 1-2 2-1 2-2 0-2 2-2 1-1 0-1-1-3-2-1-2-6 3-1 4-2 4-1 4-1h6l2,1 2,1 2-2 2-1h5l3-2 1-3 2-2h2l2-1 0-3-1-2-1-1 1-2 0-2h-1l-2-1-1-1 0-2 6-6 0-1 2-2 3-5 3-4 2-2 2-2 3-1 6-2 3,1 4-2 8-2v5l3,7 1,5-1,4 2,4 1,2-1,3 3,1 1,1 3,11-1,5v11l1,5 1,4 1,7v8l-1,2 2,2 1,2-2,2v1h1l2-2 2-2 1-1 2,1h2l8-4 3-3 1-1 4,2-3,3-4,3-7,5-3,1-6,2-4,1h-1l0-4 0-3 0-2-2-1-5-1-4-1-4-2z" />
                  <path d="M825,225l1-1 3-1 1-2 2-3 3-3h0l-3-2-3-2-1-3h-3l0-2-1-2 2-1 1-3-2-1 0-2 2-3 0-3 3-3h-1-2l-3-2-1-6h-4l-2-3-18,4-43,9-9,1-1-6-5,5h-1l-5,3 3,19 3,10 3,19h4l12-2 37-7 15-3 9-2h0l2-2h2z" />
                  <path d="M830,188l-3,3v3l-2,3v2l2,1-1,3-2,1 1,3v1h3l1,3 3,2 3,2h0l-3,3-2,2-1,3-3,1v2 1l-1,3 1,2 3,3 5,2 4,1 1,1-1,1v3h1l2-2 1-5 3-4 3-7 1-5-1-1 0-10-2-3-1,1h-3 0l1-1 2-2 0-1 0-4 0-3 0-2-3-1-5-2-4-1-3-2z" />
                  <path d="M826,228l0-2 0-2-1,1h-2l-2,2 2,5 2,6 2,9 2,7h5l6-2-2-7-1,1-4-3-2-5-2-3-3-3-1-2 1-2z" />
                  <path d="M840,252l-6,2h-5l-2-7-2-9-3-7-1-4-7,2-15,3-38,7 1,5 1,6 1-1 2-2 2-3h2l2-2 2-2h1 3l2-2 2-2h2l2,1 3,2 2,1 1,2 4,2v2l6,2h1l1-2 3,2-1,3-1,4-2,2v2l1,2 5,2 4-1 3,1 2,1 1-2-1-2 0-2-3-2-2-6 2-5 0-2-2-2c0,0,2-1,2-2 0,0,0-2,0-2l2-1 2-2 1,1-2,2-1,4v1h2v5l-2,1 1,4h0l1-2 2,2-2,1v3l2,4h4l2-1 3,5h2l6-3 2-4 0-5zM824,261l1,3v2l1,2c0,0,1-1,1-2 0,0-1-3-1-3l0-2h-2z" />
                  <path d="M832,266l-1-2 7-2-1,3-3,4v4 4l-2,5-2,1-1-4 0-6 2-4 1-3zM835,294l-58,13-38,5h-6l-3,2h-7l-9,1-11,2 11-6 0-2 1-2 11-12 4,5 4,1 2-1 3-2 2,2 4-2 2-4h2l3-2 2,1 3-4 0-2-1-2 1-1 6-13 0-5 1-1 3,3 4-1 1-7 3-1 1-3 3-2 3-6 0-5 10,4c0,0,0-5,0-5l4,2v3l6,1 2,1 2,2-1,4-2,2v2l1,2 5,1 4,1h3l2,1 1,3h3l1,1v5l1,1-1,2 2,1-1,1h-2v2l2,1v2l2,2 1,2-3,2 2,1 5-2 4,6z" />
                  <path d="M761,239l1,5 1,6 3-3 2-3h2l2-2 2-2h1 3l2-2 2-2h2l2,1 3,2 2,2 2,1-1,5-6-2-4-2v5l-3,6-3,2-1,3-2,1-1,3-1,4-4,1-3-3-1,1v5l-2,4-5,11 1,1v2l-3,4-2-1-3,2h-2l-2,4c0,0-3,2-4,2 0-1-3-2-3-2l-2,2-2,1-4-1-1-1-2-3-3-2-2-4-4-3-1-3-3-1-1-2 0-5h2l2-1 1-3 1-1 0-5 1-4 2-1 1,1v2l2-1 1-1-2-2 0-3 1-1 3-3 1-2 2,1 2-2 3-3 3-4 0-6 1-5 0-4-2-4 1-1 2-1 3,20 5-1 12-2z" />
                  <path d="M735,193l-6,4-4,3-3,3-4,4-3,1-3,1-6,2h-2l-3-3-5,1-3-2-2-1-5,1-10,1-12,3 2,14 1,14 3,23 1,5h4l2-1 3,2 3,4h5l2,2h1l3-1h2l6,1 2-2 2-2h2l1,2 1,1 4,3h2l1-1 1-3 1-1 0-5c0,0,1-4,1-4l2-1 1,1v2l2-1 1-1-2-2 1-3 0-1 2-3 1-1h3l2-2 3-3 3-4 0-5 0-5 0-5-1-3 1-2 2-1-3-9-3-20z" />
                  <path d="M620,300l0-3 0-4 2-3 2-4 3-4-1-6-2-3 0-3 1-6-1-7-1-16-1-15-1-12 3,1 1,1h2l2-2 3-2h5l22-2 5-1 2,16 4,37 1,6-1,2 1,2v1l-2,2-4,1-3,1v5l-5,3-3,4 1,3-1,1h-3l-2-2-2,2-3,1v3l-1,1-1-1-2-2-3,1-2,3h-1l-1-2h-5l-6,1-2,2z" />
                  <path d="M620,300l0-3 0-5 2-2 2-5 3-4-1-5-2-3 0-4 1-5-1-7-1-16-1-15-1-12h-1l0-3-2-4-1-2-2-2 0-6-46,3v2l3,1 1,1v2l4,3 1,3-1,3-2,4-1,2-2,2-2,1-5,1-1,2v2 1l2,2v4l-2,2-1,1v3l-1,1-2,1v1 2l-2,1-1,3 1,4 2,7 7,8 6,3v5l1,1 6,1 3,1-1,4-2,6-1,3 2,4 7,5 4,1 2,5 2,3v3l1,4 2,2 1-1 1-2 2-2h3l2,1 4,1h1l0-2-1-3 0-2 2-1 3-1 1-1 0-1-1-2 1-1 2-4z" />
                  <path d="M874,179l-4-15-4,1-22,5 1,3 2,7v9l-1,2 2,2 4-4 4-3 2-2v1l3-2 5-1 8-3z" />
                  <path d="M615,197l0-3-1-4-1-6-1-3 1-3 1-3 1-2 0-4-1-3 0-2 2-3 1-2-1-2 0-2 0-4 3-6 3-7 0-2-1-1h0l-5,7-2,4-2,2-1,2-2,1-1,2-2-1 0-2 2-2 2-5 1-1 1-3-2-2-2-10-4-1-2-3-12-2-3-1-8-2-8-2-4-5v1h-1l-1-2-1,1h-2l-1,1-1-1 0-2 2-3 1-1-2-1h-2l-3,2-7,4h-3-3l-1-1-2,3v3 8l-1,2-6,3-2,6 1,1 2,2 1,3-2,3v4 7l3,3h4l2,3h3l4,6 7,4 2,3 1,7 1,4 2,1v2l-2,3v3l3,4 2,1 3,1 2,1 45-3z" />
                  <path d="M835,294l2,5 4,7 2,2 1,2-3,1h1v4l-3,2v2l-2,3-3,1h-3-1l-2-1v1 1h2l1,1-2,6h4l1,2 2-2 2-1-2,4-3,5h-2l-1-1-3,1-5,2-6,6-4,4-2,7v2l-5,1-5,1-10-8-13-8-3-1-12,2-5,1-1-4-3-2-17,1-7,1-9,4-6,3-21,2 0-4 2-1 3-1 0-4 5-2 3-2 5-3 4-2 1-4 4-3 0-1c0,0,0,2,1,2 1,0,2,0,2,0l2-4h2 3l1-4 3-2 1-2 0-4h4l7-1 16-2 15-2 22-5 20-4 11-3 5-1zM839,328l3-3 3-3h2l0-2-1-6-1-3-1-2h1l2,6 1,4v4l-4,1-3,2-1,2h-1z" />
                  <path d="M806,251l-2-2-1-1 1-2 3,2-1,3z" />
                  <path d="M900,173h2l0-2h1l1,2-1,1h-4l1-1zM890,174l3-3h1l2,2-2,1-3,1-1-1zM855,152l18-5h2l2-3 4-2 3,5-3,5v1l2,3 1-1h2l2,3 4,6h4l2-1 2-2-1-2-2-2-2,1-1-1 1-1h2l2,1 2,2 1,3v3l-4,1-4,2-4,4-2,2 0-1 3-2 0-1-1-3-3,1-1,2 1,2-2,1-3-5-3-4-2-2-7,2-5,1-21,5 0-5 0-11 5-1 6-1z" />
                  <path d="M697,318l-52,5-16,2-5,1h-3l-1,4h-8l-7,1-8-1-1,7-2,6-3,3-2,4v3l-4,2 1,4-1,4-1,1 109-11 0-4 2-1 3-1 0-4 4-2 5-2 4-3 4-2 1-4 4-4h0c0,0,0,2,1,2 1,0,2,0,2,0l2-4h2 3l1-4 3-2 1-2 0-4h-2l-3,2h-7l-18,2-8,2z" />
                  <path d="M594,343l-4,1-5-1 0-1 3-3 1-4-2-3-78,3 1,7v8l2,11v38l2,2 3-2 3,1 1,7 55-1 1-2 0-4-2-3 2-1-2-3 1-2 1-6 3-2-1-2 4-6 3-1 0-1-1-2 3-6 2-1 1-4 2-1h-4l-1-4 3-3 0-2 2-4 1-3z" />
                  <path d="M558,248l-2-3-1-2-65,2h-2l1,3v2l3,4 3,4 3,3h2l2,1v3l-2,2-1,2 2,3 3,3 2,2 2,12v36 4l1,6 22-1 23-1 21-1h12l2,4-1,3-3,2v2l5,1 4-1 2-5 0-6 2-3 3-1 0-3 1-2-2-3-1,1-2-2-1-5 1-2-2-4-2-4-5-1-7-6-2-4 1-3 2-6 1-3-2-1-7-1-1-2 0-4-6-3-7-8-2-7 0-5 0-2z" />
                  <path d="M672,356v2 2l1,3 3,8 3,10 1,6 2,5 1,7 3,6 2,4 1,3 2,1v2l-2,5-1,3v2l2,4v6l-1,2 1,1 2,1v3l2,3 2,2 8,1 11-1 21-1 6-1h4l1,3 2,1 1-5-2-4 1-2 6,1h5l-1-6 2-10 2-4-1-3 4-6-1-1h-2l-2-1-1-2-1-4-3-2h-2l-2-5-3-7-4-1-2-2-1-3-2-2-3-1-2-3-3-2-4-2-1-2-2-3-1-1-3-5h-4l-4-2-1-2 0-1 1-2 2-1-1-2-42,5z" />
                  <path d="M765,408l-2,1-2-1-1-2-1-4-3-2-2-1-2-4-3-6-4-2-2-2-1-3-2-2-3-1-2-3-3-2-4-2-1-2-2-2-1-2-3-5h-4l-4-2-1-2 0-1 1-2 2-1-1-3 6-2 9-4 8-1 16-1 3,2 1,4 5-1 12-2 3,1 13,8 10,8-5,5-3,7-1,6-1,1-1,2-3,1-2,4-3,2-2,4-1,1-4,3h-3l1,3-5,6-2,1z" />
                  <path d="M726,295l-2,3-4,4-5,5-1,2v2l-4,2-6,4-7,1-52,5-16,2h-5-3l-1,5h-8-7-8l1-1 3-1 0-4 1-1-2-3 1-2 2-2h3l2,1 4,1h1l0-2-1-3 0-2 2-1 3-1 1-1 0-2-1-1 1-1c0-1,2-4,2-4l3-2 5-1h5l1,2h1l2-3 3-1 2,2 1,1 1-1 0-3 3-1 2-2 2,2h3l1-1-1-3 3-4 5-3 0-5h3l4-2 2-2 0-1-1-2 1-3h4l2-1 3,2 3,4h5l2,2h1l3-1h5l3,1 1-2 3-2 2-1 1,3 2,1 2,2v6l1,2 3,1 1,3 4,3 2,4 2,1z" />
                  <path d="M631,460l-1-14-3-19 0-14 1-31 0-16 0-7 45-3-1,2 1,2v3l4,8 2,10 1,6 2,5 2,7 2,6 2,4 1,3 2,1v2l-2,5v3l-1,2 2,4v6 2 1l2,1v3l-6-1-6,1-26,3-10,1-1,3 2,2 3,2v8l-5,2h-3l3-2 0-1-3-6-3-1-1,5-1,3-1-1h-3z" />
                  <path d="M608,459l-3-3 1-6h-1l-9,1h-25l-1-2 1-9 3-6 5-8 0-3h1l0-2-2-3 0-1-2-5 0-6-55,1v9 10l1,4 3,4v5l5,5v3l1,1-1,9-3,5 2,2-1,2-1,8-1,3v3l5-1h12l10,4 7,1 3-2 4,1 3,1 1-2-4-1-2,1-3-2c0,0,0-1,1-1 1-1,3-1,3-1l2,1 1-1 4,1 1,2 1,2 4,1 2,1-1,2-1,1 1,2 9,3 3-1 1-3h3l2-2 1,1 1,3-3,1 1,1 4-2 2-3 1-1h-3l1-2 0-1h2l1-2 1,1c0,0,0,3,1,3 0,0,4,1,4,1l4,2 1,1h3l1,1 2-3 0-1h-1l-4-3-5-1-4-2 2-3h2 0l-2-1 0-1h3l2-3-1-2 0-2h-2l-2,2v2h-4l0-2 1-2 2-3-1-3-1-4z" />
                  <path d="M632,459l-1,2h-5l-1-1-2-1-7,2h-2l-3,4-1,1-1-3-1-4-3-3 1-6h-1-2l-8,1h-24l-1-2 1-9 3-5 5-9 0-3h1l0-2-2-2 0-3-2-4 0-6 1-2 0-4-2-3 2-1-2-3 1-1 1-7 3-2-1-2 4-6 3-1 0-2-1-1 3-6 2-1 1-1 37-4v6 17l-1,31v14l3,19 2,13z" />
                  <path d="M569,200v2l3,1 1,1v2l4,3 1,3-1,3-2,3v3l-3,2h-1l-6,2-1,4v1l2,2v4l-2,2-1,1 1,3-2,1-2,1v1 2l-1,1-3-3-1-2-66,2h-1l-2-4 0-7-2-4 0-5-3-4-1-5-2-7-2-6-1-2-1-2 1-5 2-6-3-2 0-3 1-2h1l83-2 1,5 2,1v2l-2,3v3l3,4 2,1 4,1v1z" />
                  <path d="M475,129l0-9-2-7-2-13 0-10-2-4-2-5 0-10 1-4-2-5h30l1-9h0l2,1 2,1 1,5 2,6 1,2h5v1l7,1v2h5l0-2 1-1h2l2,1h3l3,2 6,3h2l1-1h1l1,3 2,1 1-1 1,1v2l3,1h3l1-1 3-3 3-1 1,2v1h1l1-1h9l2,3h1l0-1h5l-1,2-4,2-9,4-5,2-3,2-2,4-3,4-1,1-5,5h-1l-4,3-3,3v3 8l-1,2-6,3-2,6 3,3 1,3-2,3v4 7l3,3h4l2,3h3l4,6 7,4 2,3 1,6-81,2-1-36 0-3-4-4-1-1 0-2 2-2 1-1 0-3z" />
                  <path d="M380,321l-16-1-1,11 20,1 32,1-2,24v18 2l4,3 2,2 1-1 1-2 1,2h2l0-1 3,1-1,4h4l3,1 4,1 2,2 3-2 3,1 3,3h1v2l2,1 2-2h2 3v3l7,2 1-1 2-4h1l1,2 4,1 4,1 3,1 2-1 1-2h4l2,1 3-2h1v1h5l1-2 2,1 2,2 3,2 3,1 2,1 0-37-1-11 0-9-2-7-1-7 0-4-12,1-46-1-45-2-25-1z" />
                  <path d="M361,331l23,1 31,1-2,23v18 2l4,4 2,2 1-1 1-2 1,2h2l0-1 1,1h2l-1,4h4l3,1 4,1 3,2 2-2 3,1 3,3h1v2l2,1 2-2h2 3v3l7,2 1-1 2-4h0 1l1,2 4,1 4,1 3,1 2-1 1-2h4l2,1 3-2h1l1,1h4l1-2 2,1 2,2 4,2 2,1 2,1 2,2 3-2 3,1 1,7v9 10l1,3 3,5 1,5 4,5v3l1,1-1,9-3,5 2,2-1,2-1,8-1,3v3l-6,2-9,4-1,2-3,2-2,2-1,1-6,5-3,2-5,3-6,3-6,3-2,2-6,3-3,1-4,5-4,1-1,2 2,1-1,6-1,5-2,3v5 2l2,7 1,6 2,3-1,2-3,2-6-4-5-1h-2l-3-1-4-3-5-1-8-3-2-4-1-7-3-1-1-3h1l0-4h-1l-1-1 1-5-1-2-4-1-3-5-3-6-5-3 0-2-5-12-1-4-1-2-1-2-6-5-2-3 0-1-3-2-7-2h-7l-3-2-5,1-3,2-2,3-1,4-5,6-2,2-3-1-2-1h-1l-4-3h0l-2-2-5-2-8-8-2-5 0-8-3-6-1-3-1-1-1-2-5-2-2-2-7-8-1-3-5-2-1-5-3-3h-2l0-5 8,1 29,3 29,1 2-19 4-56 1-18h2M462,560l-1-7-3-7 0-7 1-8 4-7 3-6 3-3h1l-5,7-4,6-2,7-1,5 1,6 3,7v6l1,1h-1z" />
                  <path d="M288,424l-1-5 9,1 30,3 27,1 3-18 4-56 1-20 2,1 1-12-104-10-18,120 16,2 1-10 29,3z" />
                  <path d="M508,324l-13,1-46-1-44-2-25-1 4-65 22,1 40,1 45,1h5l2,2h2l1,1v3l-1,2-1,2 2,3 3,3 2,2 2,11v36z" />
                  <path d="M486,241l3,7v2l4,6 2,3h-5l-43-1-41-1-22-1 1-21-32-3 4-44 15,1 21,1 17,1 24,1h11l2,2 5,3 1,1 4-1 4-1h3l2,1 4,2 3,1v2l1,2h2 1l1,5 3,8v4l3,4v5l2,4v7z" />
                  <path d="M476,204l0-1-2-4 1-5 2-6-3-2 0-3 0-2h4l0-5-1-31 0-3-4-4-1-1-1-2 3-1 1-2 0-3-58-1-55-4-5,64 14,1 20,1 18,1 24,1h12l2,2 5,3 1,1 4-1 7-1 2,1 4,2 3,2v1l1,2h2z" />
                  <path d="M475,129l0-9-2-6-2-13 0-11-2-3-2-6 0-10 1-4-2-5-29-1-18-1-27-1-23-2-7,67 55,4 58,1z" />
                  <path d="M360,143l-106-13-14,88 113,14 7-89z" />
                  <path d="M369,57l-30-3-30-3-29-4-32-6-19-3-32-7-5,21 3,8-1,4 2,5 3,1 5,11 2,3 1,1 3,2 1,2-7,17v3l2,3h1l5-3 1-1h1v6l3,12 3,3 1,1 1,2v3l1,4 1,1 2-3h3l3,2 3-1h4l3,2 3-1 1-3 3-1 1,2v3l2,1 2-11 106,13 9-86z" />
                  <path d="M380,321l5-86-113-13-13,88 121,11z" />
                  <path d="M148,176l9-35 2-4 2-6-1-2h-3l0-1 0-1 0-3 5-6h2l1-1 0-4h1l4-6 4-4 0-4-3-3-2-4 14-64 13,3-4,21 4,8-2,4 2,5 3,1 4,10 3,4 1,1 3,2 1,2-7,17v3l2,3h1l5-3 1-1h1v6l3,12 4,4 1,2v4l1,3 1,1 2-3h3l3,2 3-1h4l4,2 2-1 1-3 3-1 1,2v3l2,1-9,54c0,0-88-17-95-19z" />
                  <path d="M259,310l-83-12 20-112 47,8-1,11-3,13 8,1 17,2 8,1-13,88z" />
                  <path d="M145,383l-3,2v1 1l19,11 12,7 15,9 17,10 12,2 25,3 18-119-84-12-3,17h-2l-2,2h-2l-1-3h-3l-1-1h-1-1l-2,1v7 2l-1,13-1,2-1,3 3,5 1,6 1,1 1,1v2l-2,1-3,2-2,2-2,4v4l-3,3-2,1v1 1 1l4,1-1,3-1,2-4,1z" />
                  <path d="M196,186l-23,128-2,1-2,2h-2l-1-3h-3l-1-1h-1l-3,2v6 6l-1,9-1,2-3-1L84,232l19-67 93,21z" />
                  <path d="M149,176l9-35 1-4 2-6-1-1h-2l-1-2 0-1 1-4 4-5 2-1 1-1 1-4 4-6 4-4 0-3-3-2-2-5-12-4-16-3h-15l0-2-6,3-4-1-3-2-1,1h-5l-1-2-6-2v1l-5-2-2,2h-6l-6-5h1l0-8-2-4-4-1-1-2-2-1-6,2-2,7-4,10-3,6-5,14-6,14-8,13-2,3-1,8v12l113,27z" />
                  <path d="M102,8l4,1 10,3 9,2 20,5 23,6 15,3-14,64-12-4-16-3h-15l0-2-6,3-5-1-2-2-1,1h-5l-1-2-6-2v1l-5-2-2,2h-6l-6-5 1-1 0-7-2-4-4-1-1-2-2-1-4,2-2-4 0-3h3l2-4-3-1 0-4h4l-2-3-2-7 1-3 0-8-2-3 2-10 2,1 3,3 3,2 3,2 4,2 3,1 3,1 4,1h2l0-2 1-1 2-2 1,2v1l-2,1v2l1,1 1,3 1,2h2l0-2-1-1-1-3 1-2-1-2 0-2 2-3-1-3-2-5 0-1h1zM93,14l2-1v2l2-2h2l1,2-2,1 1,1-1,2-1,1c0,0-1,0-1-1 0,0,1-2,1-2l-1-1-1,2h0l-2-2 0-2z" />
                  <path d="M145,382h4l1-2 1-3-4-1 0-1 0-2h0l2-1 3-3 0-5 2-3 2-2 3-2 2-1 0-2-1-1-1-1-1-6-3-5 1-3-3-1L84,233l19-68-67-16-1,5-1,7-5,12-3,3v1l-2,1-1,4-1,3 3,4 1,5 1,3v7l-2,3v5l-1,4 1,4 3,5 2,4 2,4-1,4h0v2l6,7-1,2v2l-1,2v8l2,4 2,3h3l1,3-1,4-2,1h-2v4 3l3,4 2,6 1,4 2,3 3,6 2,3v3l2,1v2l-1,2-2,7v2l2,3h4l5,2 4,2h3l2,3 3,5 1,2 4,3h5l1,2 1,4h-1v1l3,1h3l3-1 4,4 1,2 2,4 1,3v10 2l10,1 20,3 14,1zM57,338l1,2v1h-4l0-1-1-1 4-1zM58,338h2l3,2 3,1-1,1h-4l-2-2-1-2zM79,358l2,3 1,1h1l1-1-1-2-3-2h-1v1zM78,367l2,3 1,2h-2l-1-1c0,0-1-1-1-2 0,0,0-2,0-2h1z" />
                </g>
                <g fill="none" stroke="rgba(212,165,116,.42)" strokeWidth="1.2" strokeDasharray="3 4" strokeLinecap="round" pointerEvents="none">
                  <path d="M98,372Q320,380 498,430" />
                  <path d="M498,430L500,478" />
                  <path d="M498,430Q600,412 704,395" />
                  <path d="M704,395Q760,395 790,380" />
                  <path d="M790,380L765,378" />
                </g>
                <g>
                  <circle className="lmb-r lmb-coverage" data-region="Eastern North Carolina" cx="790" cy="333" r="40" />
                  <circle className="lmb-r lmb-coverage" data-region="Coastal South Carolina" cx="765" cy="380" r="38" />
                </g>
                <g>
                  <circle className="lmb-r lmb-city" data-region="Los Angeles" cx="98" cy="372" r="14" />
                  <circle className="lmb-r lmb-city" data-region="Dallas" cx="498" cy="430" r="14" />
                  <circle className="lmb-r lmb-city" data-region="Northern Houston" cx="500" cy="478" r="14" />
                  <circle className="lmb-r lmb-city" data-region="Southern Atlanta" cx="704" cy="395" r="14" />
                </g>
                <g transform="translate(900,540)" pointerEvents="none">
                  <circle r="22" fill="rgba(22,52,107,.6)" stroke="rgba(212,165,116,.55)" />
                  <circle r="14" fill="none" stroke="rgba(212,165,116,.3)" strokeDasharray="2 2" />
                  <path d="M0,-16L-4,0L4,0z" fill="#ffd166" />
                  <path d="M0,16L-4,0L4,0z" fill="rgba(212,165,116,.45)" />
                  <text x="0" y="-26" textAnchor="middle" fill="#d4a574" fontSize="11" fontWeight="700">N</text>
                </g>
                <g transform="translate(40,555)" pointerEvents="none" stroke="rgba(212,165,116,.55)">
                  <line x1="0" y1="0" x2="80" y2="0" />
                  <line x1="0" y1="-4" x2="0" y2="4" />
                  <line x1="40" y1="-3" x2="40" y2="3" />
                  <line x1="80" y1="-4" x2="80" y2="4" />
                  <text x="0" y="-8" fill="rgba(255,255,255,.55)" fontSize="10" stroke="none">0</text>
                  <text x="80" y="-8" textAnchor="end" fill="rgba(255,255,255,.55)" fontSize="10" stroke="none">~600 mi</text>
                </g>
                <g className="lmb-tip" pointerEvents="none" opacity="0">
                  <rect className="lmb-tip-bg" rx="8" width="160" height="36" fill="#fff" stroke="#d4a574" strokeWidth="1.5" />
                  <polygon className="lmb-tip-arrow" points="80,42 73,36 87,36" fill="#fff" stroke="#d4a574" strokeWidth="1.5" />
                  <text className="lmb-tip-text" x="80" y="22" textAnchor="middle" fill="#1a3e6a" fontSize="13" fontWeight="600">Region</text>
                </g>
              </svg>
              <div className="mt-3.5 pt-3.5 border-t border-white/10 flex flex-wrap gap-5 text-[11px] text-white/65 uppercase tracking-wider">
                <span className="inline-flex items-center gap-2"><span className="w-3.5 h-3.5 rounded-full bg-[#d4a574]/45 border border-[#d4a574]"></span>Coverage Area</span>
                <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#d4a574]/45 border border-[#d4a574]"></span>Metro Market</span>
              </div>
              <div className="lmb-detail mt-3 p-3 md:p-3.5 bg-white/[.03] border border-white/10 rounded-lg min-h-[120px] sm:min-h-[140px] md:min-h-[145px] flex flex-col justify-center">
                <div className="lmb-d-default flex items-start gap-3.5">
                  <span className="w-9 h-9 flex items-center justify-center rounded-lg text-base font-bold shrink-0 bg-[#d4a574]/15 text-[#d4a574]">↗</span>
                  <div>
                    <div className="text-[15px] font-bold leading-tight text-white">Hover or tap any market</div>
                    <div className="text-xs text-white/65 mt-0.5">Six active investment regions across the United States</div>
                  </div>
                </div>
                <div className="lmb-d-active flex items-start gap-3.5">
                  <span className="lmb-d-marker w-3.5 h-3.5 shrink-0 mt-1.5 rounded-full"></span>
                  <div className="flex-1 min-w-0">
                    <span className="lmb-d-tag inline-block text-[9px] font-bold tracking-widest px-1.5 py-0.5 rounded mb-1 text-[#d4a574] bg-[#d4a574]/10 border border-[#d4a574]/30"></span>
                    <div className="lmb-d-title text-[15px] font-bold leading-tight text-white"></div>
                    <div className="lmb-d-sub text-xs text-white/65 mt-0.5"></div>
                    <div className="lmb-d-desc text-xs text-white/75 mt-1.5 max-w-[480px] leading-relaxed"></div>
                  </div>
                  <button className="lmb-d-pin shrink-0 inline-flex items-center gap-1.5 px-3 py-2 bg-transparent rounded text-[11px] font-semibold tracking-wider cursor-pointer transition-colors duration-150 border border-[#d4a574]/45 text-[#d4a574]" type="button">
                    <span>◉</span><span className="lmb-d-pin-l">Pin</span>
                  </button>
                </div>
              </div>
            </motion.div>
            <motion.aside
              className="flex flex-col gap-2"
              initial={{ opacity: 0, x: 60 }}
              animate={visible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            >
              <div className="text-xs font-bold tracking-widest uppercase text-[#d4a574]">Markets</div>
              <p className="text-xs text-white/65 mb-2 leading-relaxed">Hover to highlight on the map · click to pin</p>
              {[
                { region: "Eastern North Carolina", sub: "North Carolina · Charlotte to coast", type: "STATE" },
                { region: "Coastal South Carolina", sub: "South Carolina · Greenville to coast", type: "STATE" },
                { region: "Los Angeles", sub: "California · Southern metro", type: "METRO" },
                { region: "Dallas", sub: "Texas · North Texas metro", type: "METRO" },
                { region: "Northern Houston", sub: "Texas · Greater Houston", type: "METRO" },
                { region: "Southern Atlanta", sub: "Georgia · Atlanta metro", type: "METRO" },
              ].map(({ region, sub, type }) => (
                <button key={region} className="lmb-card flex items-center gap-3 w-full p-3.5 bg-white/5 border border-white/10 rounded-lg cursor-pointer text-left transition-colors duration-150 relative" data-region={region} type="button">
                  <span className="w-3 h-3 shrink-0 rounded-full bg-[#d4a574]/45 border border-[#d4a574] transition-colors duration-150"></span>
                  <span className="flex-1 min-w-0 flex flex-col">
                    <span className="text-sm font-semibold leading-tight text-white">{region}</span>
                    <span className="text-xs text-white/65 leading-snug mt-0.5">{sub}</span>
                  </span>
                  <span className="shrink-0 text-[9px] font-bold tracking-widest px-1.5 py-1 rounded bg-[#d4a574]/15 text-[#d4a574] border border-[#d4a574]/30">{type}</span>
                </button>
              ))}
            </motion.aside>
          </div>
        </div>
      </div>
    </section>
  );
}