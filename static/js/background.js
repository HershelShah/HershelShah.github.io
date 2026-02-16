/**
 * Morphing Julia Set — WebGL
 * HDR-style vivid colors, tighter view for boundary detail,
 * slow morphing that lingers on the most intricate shapes.
 */
(function () {
  "use strict";

  const canvas = document.createElement("canvas");
  canvas.id = "bg-canvas";
  canvas.style.cssText =
    "position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;";
  document.body.prepend(canvas);

  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  if (!gl) return;

  const VERT = `
    attribute vec2 a_pos;
    void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
  `;

  const FRAG = `
    precision highp float;

    uniform vec2  u_resolution;
    uniform float u_time;
    uniform vec2  u_julia_c;

    // Hue-only palette — brightness controlled separately by iteration depth
    vec3 hue(float t) {
      t = t + u_time * 0.012;
      vec3 a = vec3(0.50, 0.50, 0.50);
      vec3 b = vec3(0.50, 0.50, 0.50);
      vec3 c = vec3(1.00, 0.80, 1.20);
      vec3 d = vec3(0.00, 0.25, 0.55);
      return a + b * cos(6.28318 * (c * t + d));
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

      vec2 z = uv * 1.6;
      vec2 c = u_julia_c;

      float i = 0.0;
      float trap = 1e10;
      float trapLine = 1e10;
      float trapCircle = 1e10;

      for (float n = 0.0; n < 300.0; n++) {
        if (dot(z, z) > 256.0) break;
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
        i = n;
        trap = min(trap, dot(z, z));
        trapLine = min(trapLine, abs(z.x) + abs(z.y));
        trapCircle = min(trapCircle, abs(length(z) - 1.0));
      }

      vec3 col;
      bool escaped = dot(z, z) > 256.0;

      if (!escaped) {
        // Interior: activity from orbit traps drives brightness
        float g1 = exp(-trap * 1.5);
        float g2 = exp(-trapLine * 2.5);
        float g3 = exp(-trapCircle * 3.0);
        float activity = max(g1, max(g2, g3));

        vec3 h = hue(trap * 3.0);

        // Gamma curve: pow > 1 compresses highlights, keeps most in mid-darks
        // Only the absolute peak activity gets truly bright
        float brightness = pow(activity, 2.2);

        col = h * brightness;

        // Accent glow — also gamma'd so they don't blow out
        col += vec3(0.15, 0.50, 1.00) * pow(g1, 2.5) * 0.8;
        col += vec3(0.80, 0.20, 1.00) * pow(g2, 2.5) * 0.5;
        col += vec3(0.10, 1.00, 0.40) * pow(g3, 2.5) * 0.6;

      } else {
        float log_zn = log(dot(z, z)) * 0.5;
        float nu = log(log_zn / log(2.0)) / log(2.0);
        float smooth_i = i + 1.0 - nu;

        // Normalize iteration depth
        float depth = clamp(smooth_i / 120.0, 0.0, 1.0);

        // Gamma curve: pow(depth, 2.2) keeps most of the range dark/mid,
        // only the highest iteration points near the boundary get bright
        float brightness = pow(depth, 2.2);

        // Hue from palette
        vec3 h1 = hue(smooth_i * 0.05);
        vec3 h2 = hue(smooth_i * 0.14 + 0.4);
        vec3 h = mix(h1, h2, 0.3);

        col = h * brightness;

        // Orbit trap filament glow — also gamma'd
        float g1 = exp(-trap * 3.0);
        float g2 = exp(-trapCircle * 6.0);
        col += vec3(0.40, 0.85, 1.00) * pow(g1, 2.0) * brightness * 0.5;
        col += vec3(0.30, 1.00, 0.50) * pow(g2, 2.0) * brightness * 0.3;
      }

      // ACES tonemapping
      col = col * (2.51 * col + 0.03) / (col * (2.43 * col + 0.59) + 0.14);

      // Minimal vignette
      vec2 vUv = gl_FragCoord.xy / u_resolution;
      float vig = 1.0 - 0.06 * length(vUv - 0.5);
      col *= vig;

      col = clamp(col, 0.0, 1.0);
      gl_FragColor = vec4(col, 1.0);
    }
  `;

  // ── Compile & link ────────────────────────────────────────────────

  function createShader(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error("Shader compile error:", gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  const vs = createShader(gl.VERTEX_SHADER, VERT);
  const fs = createShader(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return;

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(prog));
    return;
  }
  gl.useProgram(prog);

  // ── Geometry ──────────────────────────────────────────────────────

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW
  );
  const aPos = gl.getAttribLocation(prog, "a_pos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  // ── Uniforms ──────────────────────────────────────────────────────

  const uRes    = gl.getUniformLocation(prog, "u_resolution");
  const uTime   = gl.getUniformLocation(prog, "u_time");
  const uJuliaC = gl.getUniformLocation(prog, "u_julia_c");

  // ── Beautiful Julia c values ──────────────────────────────────────
  // Ordered so consecutive pairs have the most interesting transitions

  const C_VALUES = [
    { re: -0.7269, im:  0.1889 },  // Seahorse valley spiral
    { re: -0.8,    im:  0.156  },   // Douady rabbit
    { re: -0.4,    im:  0.6    },   // Connected swirl
    { re: -0.1,    im:  0.651  },   // Dendrite tendrils
    { re:  0.285,  im:  0.01   },   // Siegel disk rings
    { re:  0.355,  im:  0.355  },   // Spiral arms
    { re: -0.54,   im:  0.54   },   // Fat spiral
    { re: -0.75,   im:  0.0    },   // Basilica figure-8s
  ];

  // ── Animation state ────────────────────────────────────────────────
  // morphTime is our own clock that advances at variable speed.
  // Persisted in sessionStorage so it survives page navigation.

  const STORAGE_KEY = "fractal_morphTime";
  const LINGER_SPEED = 0.4;      // speed during dynamic morphing (mid-transition) — savor it
  const RUSH_SPEED   = 3.0;      // speed when settled/static (ease endpoints) — skip ahead
  const MORPH_DURATION = 20;     // seconds per c-value transition

  let morphTime = parseFloat(sessionStorage.getItem(STORAGE_KEY)) || 0;
  let lastTs = 0;
  let animId;

  // ── Resize ────────────────────────────────────────────────────────

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    canvas.width  = window.innerWidth  * dpr;
    canvas.height = window.innerHeight * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  // ── Render ────────────────────────────────────────────────────────

  function draw(ts) {
    const dt = lastTs === 0 ? 0.016 : Math.min((ts - lastTs) * 0.001, 0.1);
    lastTs = ts;

    // ── Compute morph position at current morphTime ─────────────────
    const morphT  = morphTime / MORPH_DURATION;
    const idx     = Math.floor(morphT) % C_VALUES.length;
    const nextIdx = (idx + 1) % C_VALUES.length;
    const frac    = morphT - Math.floor(morphT);

    // Quintic ease-in-out
    const t = frac;
    const s = t * t * t * (t * (t * 6.0 - 15.0) + 10.0);

    const cRe = C_VALUES[idx].re + (C_VALUES[nextIdx].re - C_VALUES[idx].re) * s;
    const cIm = C_VALUES[idx].im + (C_VALUES[nextIdx].im - C_VALUES[idx].im) * s;

    // ── Adaptive speed from ease curve derivative ──────────────────
    // Quintic ease s'(t) = 30t²(t-1)² — peak of 1.875 at t=0.5
    // High derivative = dynamic morphing = linger (slow morphTime)
    // Low derivative (endpoints) = static/settled = rush ahead
    const easeDeriv = 30.0 * t * t * (t - 1.0) * (t - 1.0); // 0 at ends, 1.875 at middle
    const changeFactor = Math.min(easeDeriv / 1.875, 1.0);   // normalize to 0..1
    const speed = RUSH_SPEED + (LINGER_SPEED - RUSH_SPEED) * changeFactor;

    // Advance our custom clock
    morphTime += dt * speed;

    // Persist every ~30 frames to avoid thrashing storage
    if (Math.floor(ts / 500) !== Math.floor((ts - 16) / 500)) {
      sessionStorage.setItem(STORAGE_KEY, morphTime.toFixed(3));
    }

    // ── Draw ────────────────────────────────────────────────────────
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniform1f(uTime, morphTime);
    gl.uniform2f(uJuliaC, cRe, cIm);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    animId = requestAnimationFrame(draw);
  }

  // ── Events ────────────────────────────────────────────────────────

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animId);
      sessionStorage.setItem(STORAGE_KEY, morphTime.toFixed(3));
    } else {
      lastTs = 0; // reset dt so we don't get a huge jump
      animId = requestAnimationFrame(draw);
    }
  });

  // Save state before navigating away
  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem(STORAGE_KEY, morphTime.toFixed(3));
  });

  // ── Init ──────────────────────────────────────────────────────────

  resize();
  animId = requestAnimationFrame(draw);
})();
