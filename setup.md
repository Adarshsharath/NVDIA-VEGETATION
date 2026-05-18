# 🛠️ NDVI Setup Guide (Beginner Friendly)

Follow these steps to set up the NDVI Vegetation Analyzer on your local machine.

---

## 🏗️ Prerequisites

Ensure you have the following installed on your computer:

- [Python 3.x](https://www.python.org/downloads/) (For the Analysis Backend)
- [Node.js](https://nodejs.org/) (For the Dashboard Frontend)
- [npm](https://www.npmjs.com/) (Automatically installed with Node.js)
- [Git](https://git-scm.com/) (For cloning the repository)

---

## 🐍 Step 1: Setting up the Backend (Flask)

The backend handles the scientific image processing.

1.  **Open your terminal** (Terminal on Linux/WSL or Mac, Command Prompt on Windows).
2.  **Navigate to the backend folder**:
    ```bash
    cd backend
    ```
3.  **Create a Virtual Environment** (If on WSL/Linux, use `venv_linux` to avoid using Windows-created files):
    ```bash
    # WSL / Linux / Mac
    python3 -m venv venv_linux
    
    # Windows Command Prompt
    python -m venv venv
    ```
4.  **Activate the Virtual Environment**:
    ```bash
    # WSL / Linux / Mac
    source venv_linux/bin/activate
    
    # Windows Command Prompt
    .\venv\Scripts\activate
    ```
5.  **Install the Required Python Packages**:
    ```bash
    pip install -r requirements.txt
    ```
6.  **Run the Backend Server**:
    ```bash
    python app.py
    ```
    - *Success!* You should see: ` * Running on http://127.0.0.1:5000`

---

## ⚛️ Step 2: Setting up the Frontend (React)

The frontend is the "Dashboard" where you upload and view your results.

1.  **Open a NEW terminal window** (Keep the backend running).
2.  **Navigate to the frontend folder**:
    ```bash
    cd frontend
    ```
3.  **Install the Frontend Packages**:
    ```bash
    npm install
    ```
4.  **Launch the Dashboard**:
    ```bash
    npm run dev
    ```
    - *Success!* You should see: `➜  Local:   http://localhost:5173/`

---

## 🌿 Step 3: Start Analyzing!

1.  Open your browser and go to: `http://localhost:5173/`
2.  Click **"Drag & Drop image"** or select a photo of a forest, field, or plant.
3.  Wait for the **"Analyzing Spectral Data..."** loading screen.
4.  View your results! You can adjust the **Sensitivity Slider** to see how health masks change in real-time.
5.  Click the **Download Button** 📥 next to **Analysis Mode** to download **both** the heatmap and the segmentation map in a single click, or download them individually using the download buttons on each card/image!

---

## 🛠️ Troubleshooting

- **CORS Error**: Ensure the backend is running on port `5000`.
- **NPM Error**: If `npm install` fails, try `npm install --legacy-peer-deps`.
- **ModuleNotFoundError (cv2)**: Ensure you created and activated your Linux virtual environment `venv_linux` (Step 1, points 3-4) before running `app.py`.
- **Performance**: High-resolution 4K+ images may take a few seconds to process on some machines.

---

<p align="center">
  Happy Analyzing! 🌱
</p>
