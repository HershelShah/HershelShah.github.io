---
title: "Projects"
layout: "single"
url: "/projects/"
summary: "Selected projects and open-source work"
hidemeta: true
---

<div class="projects-intro">
  <p>A mix of open-source work I ship at AWS, side projects, and earlier engineering I'm still proud of. The full list lives at <a href="https://github.com/HershelShah" target="_blank" rel="noopener noreferrer">github.com/HershelShah</a> and <a href="https://github.com/hershys-aws" target="_blank" rel="noopener noreferrer">github.com/hershys-aws</a>.</p>
</div>

<div class="projects-grid">

<div class="project-card">
  <div class="project-card-badge">Open Source · Work</div>
  <h3>aws-ofi-nccl</h3>
  <p>Plugin that lets NCCL collective communication run over AWS's Elastic Fabric Adapter (EFA) via libfabric. Powers distributed ML training and inference across EC2 GPU and AWS Trainium / Inferentia instances. My contributions land under <a href="https://github.com/hershys-aws" target="_blank" rel="noopener noreferrer">hershys-aws</a>.</p>
  <div class="project-tags">
    <span class="project-tag">C / C++</span>
    <span class="project-tag">NCCL</span>
    <span class="project-tag">libfabric / EFA</span>
    <span class="project-tag">CUDA</span>
    <span class="project-tag">Distributed</span>
  </div>
  <div class="project-links">
    <a href="https://github.com/aws/aws-ofi-nccl" target="_blank" rel="noopener noreferrer">Repo</a>
    <a href="https://github.com/hershys-aws" target="_blank" rel="noopener noreferrer">My commits</a>
  </div>
</div>

<div class="project-card">
  <div class="project-card-badge">Open Source</div>
  <h3>Kome</h3>
  <p>Peer-to-peer data replication middleware. C99 public API, C++17 internals, &lt;1&nbsp;MB binary, 29 exported functions. Handles namespaced KV entries with version vectors, last-writer-wins conflict resolution (with override hooks), tombstone GC, and a transport-agnostic interface. Vendored SQLite + MessagePack — zero external deps.</p>
  <div class="project-tags">
    <span class="project-tag">C99 / C++17</span>
    <span class="project-tag">CMake</span>
    <span class="project-tag">SQLite</span>
    <span class="project-tag">Replication</span>
    <span class="project-tag">Version Vectors</span>
  </div>
  <div class="project-links">
    <a href="https://github.com/HershelShah/Kome" target="_blank" rel="noopener noreferrer">Repo</a>
  </div>
</div>

<div class="project-card">
  <div class="project-card-badge">Patent · Award</div>
  <h3>HolographX</h3>
  <p>Real-time pipeline for holography-based 3D printing — watertight voxelization, morphological operators, k-means clustering, and software-based optical correction, all GPU-accelerated with CUDA + OpenCV. Software methods covered by patent <a href="https://patents.google.com/patent/WO2020028431" target="_blank" rel="noopener noreferrer">WO2020028431</a>. Winner of the Merck Innovation Award at the Merck Technical Symposium.</p>
  <div class="project-tags">
    <span class="project-tag">CUDA</span>
    <span class="project-tag">C++</span>
    <span class="project-tag">OpenCV</span>
    <span class="project-tag">Computational Holography</span>
    <span class="project-tag">three.js</span>
  </div>
  <div class="project-links">
    <a href="https://patents.google.com/patent/WO2020028431" target="_blank" rel="noopener noreferrer">Patent</a>
    <a href="/experience/prellis/">Context</a>
  </div>
</div>

<div class="project-card">
  <div class="project-card-badge">Open Source</div>
  <h3>ESPlayer</h3>
  <p>Embedded audio player built on the ESP32 with ESP-IDF. C firmware with a Python toolchain for asset prep and flashing. A weekend hardware playground that turned into something I actually use.</p>
  <div class="project-tags">
    <span class="project-tag">C</span>
    <span class="project-tag">ESP-IDF</span>
    <span class="project-tag">ESP32</span>
    <span class="project-tag">Embedded</span>
    <span class="project-tag">Python</span>
  </div>
  <div class="project-links">
    <a href="https://github.com/HershelShah/ESPlayer" target="_blank" rel="noopener noreferrer">Repo</a>
  </div>
</div>

<div class="project-card">
  <div class="project-card-badge">Shipped</div>
  <h3>Pragmatic Communications — Website</h3>
  <p>Marketing site I built for a wireless-audio hardware company. Astro + Tailwind, with product pages, industry-solution pages, support, and contact flows. Static, fast, easy for non-engineers to update.</p>
  <div class="project-tags">
    <span class="project-tag">Astro</span>
    <span class="project-tag">Tailwind</span>
    <span class="project-tag">TypeScript</span>
    <span class="project-tag">Static Site</span>
  </div>
  <div class="project-links">
    <a href="https://github.com/HershelShah/pragmatic-website" target="_blank" rel="noopener noreferrer">Repo</a>
  </div>
</div>

<div class="project-card">
  <div class="project-card-badge">Tooling</div>
  <h3>.dotfiles &amp; zmk-config</h3>
  <p>My Neovim / shell setup (lazy.nvim, lazygit, fzf, tmux) — works the same on bare metal, Codespaces, and inside Docker. Paired with a ZMK firmware build for a custom wireless split keyboard. The kind of yak-shaving that pays for itself every day.</p>
  <div class="project-tags">
    <span class="project-tag">Neovim / Lua</span>
    <span class="project-tag">ZMK</span>
    <span class="project-tag">Docker</span>
    <span class="project-tag">Bash / Zsh</span>
  </div>
  <div class="project-links">
    <a href="https://github.com/HershelShah/.dotfiles" target="_blank" rel="noopener noreferrer">dotfiles</a>
    <a href="https://github.com/HershelShah/zmk-config" target="_blank" rel="noopener noreferrer">zmk-config</a>
  </div>
</div>

</div>
