import os
import cv2
import numpy as np
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS
from io import BytesIO
from PIL import Image
import matplotlib.pyplot as plt
import matplotlib.cm as cm

app = Flask(__name__)
CORS(app)

def encode_image(image):
    _, buffer = cv2.imencode('.png', image)
    return base64.b64encode(buffer).decode('utf-8')

def calculate_ndvi(image_path_or_stream):
    # Load image
    file_bytes = np.frombuffer(image_path_or_stream.read(), np.uint8)
    img = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)
    
    if img is None:
        return None, "Failed to decode image"

    # Split channels (B, G, R)
    b, g, r = cv2.split(img.astype(np.float32))

    # NIR approximation: Use Green channel (image index 1)
    # OpenCV imdecode returns BGR: index 0=B, 1=G, 2=R
    nir = g 
    red = r

    # Calculate NDVI: (NIR - Red) / (NIR + Red + 1e-5)
    # The user specifically requested epsilon in the denominator sum.
    ndvi = (nir - red) / (nir + red + 1e-5)
    ndvi = np.clip(ndvi, -1.0, 1.0)
    
    return ndvi, img

@app.route('/upload', methods=['POST'])
def upload():
    if 'image' not in request.files:
        return jsonify({"error": "No image uploaded"}), 400
    
    file = request.files['image']
    threshold = float(request.form.get('threshold', 0.2))
    
    ndvi, original_img = calculate_ndvi(file)
    
    if ndvi is None:
        return jsonify({"error": original_img}), 400

    # 1. RdYlGn Heatmap using Matplotlib
    # Correct normalization: (ndvi + 1) / 2
    norm_ndvi = (ndvi + 1) / 2
    cmap = cm.get_cmap('RdYlGn')
    colored_map = cmap(norm_ndvi)
    
    # Convert RGBA (0-1) to BGR (0-255) for OpenCV
    colored_map_bgr = (colored_map[:, :, :3][:, :, ::-1] * 255).astype(np.uint8)

    # 2. Healthy Segmentation (Threshold-based)
    # Create pure colored segmentation: Healthy -> Green, Unhealthy -> Red
    healthy = ndvi > threshold
    segmentation_img = np.zeros(original_img.shape, dtype=np.uint8)
    segmentation_img[healthy] = [0, 255, 0] # Green
    segmentation_img[~healthy] = [0, 0, 255] # Red (BGR)

    # 3. Peak NDVI and Health Statistics
    peak_ndvi = float(np.max(ndvi))
    health_percentage = float(np.mean(healthy) * 100)

    return jsonify({
        "ndvi_heatmap": encode_image(colored_map_bgr),
        "segmented_image": encode_image(segmentation_img),
        "health_percentage": round(health_percentage, 2),
        "peak_ndvi": round(peak_ndvi, 3),
        "ndvi_stats": {
            "min": round(float(np.min(ndvi)), 3),
            "max": round(peak_ndvi, 3),
            "mean": round(float(np.mean(ndvi)), 3)
        }
    })

if __name__ == '__main__':
    # Ensure backend is accessible from frontend
    app.run(debug=True, port=5000)
