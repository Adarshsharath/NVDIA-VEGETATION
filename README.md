# 🌿 NDVI Vegetation Analyzer

[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Flask%20%7C%20Tailwind-green.svg)](https://github.com/Adarshsharath/NVDIA-VEGETATION)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A premium, full-stack ecosystem monitoring application that calculates the **Normalized Difference Vegetation Index (NDVI)** from standard RGB imagery. Designed with a focus on high-end aesthetics and scientific accuracy.

---

## ✨ Features

- **🔍 Multispectral Analysis**: Processes standard RGB photos using a Green-channel NIR approximation algorithm to simulate satellite-grade vegetation monitoring.
- **🎨 Scientific Heatmaps**: Generates high-precision NDVI heatmaps using the `RdYlGn` (Red-Yellow-Green) colormap.
- **🛡️ Health Segmentation**: Real-time binary masking (Red/Green) to distinguish between healthy foliage and non-vegetated surfaces.
- **📊 Real-time Metrics**: Tracks **Health Index (%)** and **Peak NDVI Value** with high decimal precision.
- **💎 Premium UI**: A "dark-eco" nature-themed dashboard featuring:
  - **Glassmorphism** (backdrop-blur, translucency).
  - **Matte Finishes** for a professional feel.
  - **Smooth Animations** powered by Framer Motion.
- **📥 One-Click Export**: Download your analyzed heatmaps directly for offline reporting.

---

## 🛠️ Tech Stack

### Frontend
- **React.js**: Adaptive UI components.
- **Tailwind CSS v4**: Advanced styling with a CSS-first approach.
- **Framer Motion**: Fluid micro-animations and transitions.
- **Lucide React**: Premium iconography.

### Backend
- **Flask**: Python micro-framework for the analysis API.
- **OpenCV**: High-performance image processing.
- **NumPy**: Matrix operations for spectral math.
- **Matplotlib**: Scientific colormapping for consistent analytics.

---

## 📂 Project Structure

```text
NVDIA-VEGETATION/
├── backend/                # Flask Application
│   ├── app.py              # Main API & NDVI Logic
│   └── requirements.txt    # Python Dependencies
├── frontend/               # React Application
│   ├── src/                # UI Components & Assets
│   ├── vite.config.js      # Build Configuration
│   └── package.json        # Node Dependencies
├── README.md               # Project Overview
└── setup.md                # Beginner's Guide
```

---

## 📖 Scientific Context

The **NDVI** formula used in this project is:

$$NDVI = \frac{NIR - Red}{NIR + Red + \epsilon}$$

Where:
- **NIR** is approximated using the **Green channel** (since standard RGB cameras don't capture actual Near-Infrared).
- **$\epsilon$** is a small constant ($1e^{-5}$) to ensure numerical stability.

---

## 🤝 Contributing

Contributions to improve the analysis algorithm or UI/UX are welcome! Please feel free to open a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ for a greener planet 🌱
</p>
