---
title: "Senior GPU Software Engineer — Roche Diagnostics"
url: "/experience/roche/"
summary: "Senior GPU Software Engineer at Roche Diagnostics"
hidemeta: true
weight: 2
---

<div class="experience-detail">

<div class="experience-header">
  <h2>GPU Software Engineer &rarr; Senior GPU Software Engineer</h2>
  <div class="timeline-company">Roche Diagnostics</div>
  <div class="timeline-meta">
    <span>July 2021 - March 2024</span>
    <span>Santa Clara, CA</span>
  </div>
</div>

<div class="experience-body">

### What I Did

- Designed and implemented a high-throughput (8 GB/s) file writing system using C++, CUDA, DirectIO, and GPUDirect Storage (GDS) for outputting real-time DNA sequencing data
- Designed and implemented a C++ module to write PNGs in parallel directly from the GPU in real-time with high-throughput
- Analyzed, optimized, and fused CUDA kernels with memory coalescence and shared memory, reducing PCIe traffic by 4x and increasing performance by over 25%
- Integrated DPDK libraries allowing the application to ingest up to 12 GB/s of DNA sequencing data encoded as packets over Mellanox NICs
- Designed and implemented an inter-process FIFO (12 GB/s) with CPU/GPU synchronization mechanisms
- Implemented structures such as a targetable thread pool (with CPU and GPU synchronization) and watchdog timer for increased efficiency and architectural cleanliness
- Created disk I/O benchmarking application for characterizing performance with DirectIO, GDS, and HDF5 writing
- Designed and implemented workflows for benchmarking and regression testing in GitHub Actions across various GPU architectures (sm_70, sm_80, sm_90)
- Converted, optimized, and benchmarked different CNNs for classification using PyTorch and TensorRT

### Technologies

<div class="skills-tags">
  <span class="skill-tag skill-tag--green">CUDA</span>
  <span class="skill-tag skill-tag--green">GDS</span>
  <span class="skill-tag skill-tag--green">DirectIO</span>
  <span class="skill-tag skill-tag--green">DPDK</span>
  <span class="skill-tag skill-tag--purple">C/C++</span>
  <span class="skill-tag skill-tag--purple">Python</span>
  <span class="skill-tag">TensorRT</span>
  <span class="skill-tag">PyTorch</span>
  <span class="skill-tag">CMake</span>
  <span class="skill-tag">Docker</span>
  <span class="skill-tag">GitHub Actions</span>
  <span class="skill-tag">NSight Systems</span>
  <span class="skill-tag">NSight Compute</span>
</div>

</div>
</div>
