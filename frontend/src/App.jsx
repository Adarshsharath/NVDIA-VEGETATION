import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Upload, Leaf, Trees, Info, RefreshCcw, Download, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [threshold, setThreshold] = useState(0.2);
    const [dragActive, setDragActive] = useState(false);

    const handleFile = (file) => {
        if (file && file.type.startsWith('image/')) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file));
            setResults(null);
        }
    };

    const onDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const onUpload = async () => {
        if (!selectedFile) return;
        setLoading(true);
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append('threshold', threshold);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData);
            setResults(response.data);
        } catch (err) {
            console.error(err);
            alert("Error processing image. Make sure the backend is running.");
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setSelectedFile(null);
        setPreview(null);
        setResults(null);
    };

    return (
        <div className="min-h-screen p-4 md:p-8 flex flex-col items-center">
            {/* Header */}
            <motion.header 
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="text-center mb-12"
            >
                <div className="flex items-center justify-center gap-3 mb-2">
                    <Trees className="text-nature-leaf w-10 h-10" />
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        NDVI <span className="text-nature-leaf">Vegetation Analyzer</span> 🌿
                    </h1>
                </div>
                <p className="text-nature-beige/60 text-lg max-w-2xl mx-auto">
                    Advanced ecosystem monitoring using satellite-style multispectral analysis. 
                    Monitor crop health, forest density, and biodiversity in real-time.
                </p>
            </motion.header>

            <main className="w-full max-w-6xl space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Input/Preview */}
                    <div className="lg:col-span-12 xl:col-span-4 space-y-6">
                        <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="glass-matte p-6 rounded-3xl"
                        >
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                <Upload className="w-5 h-5 text-nature-leaf" />
                                Capture Source
                            </h2>

                            {!preview ? (
                                <div 
                                    onDragOver={(e) => {e.preventDefault(); setDragActive(true);}}
                                    onDragLeave={() => setDragActive(false)}
                                    onDrop={onDrop}
                                    className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all duration-300
                                        ${dragActive ? 'border-nature-leaf bg-nature-leaf/10' : 'border-white/10 hover:border-nature-leaf/40 hover:bg-white/5'}`}
                                >
                                    <input 
                                        type="file" 
                                        className="hidden" 
                                        id="fileInput" 
                                        onChange={(e) => handleFile(e.target.files[0])} 
                                    />
                                    <label htmlFor="fileInput" className="cursor-pointer flex flex-col items-center">
                                        <div className="w-16 h-16 bg-nature-leaf/20 rounded-full flex items-center justify-center mb-4">
                                            <Upload className="text-nature-leaf w-8 h-8" />
                                        </div>
                                        <p className="font-medium">Drag & drop image</p>
                                        <span className="text-xs text-nature-beige/40 mt-1">PNG, JPG up to 10MB</span>
                                    </label>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="relative group rounded-2xl overflow-hidden shadow-2xl">
                                        <img src={preview} alt="Preview" className="w-full h-auto object-cover max-h-[300px]" />
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <button onClick={reset} className="p-3 bg-red-500/80 rounded-full text-white hover:bg-red-500 ring-4 ring-white/10">
                                                <RefreshCcw className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                    
                                    <div className="space-y-4 mt-6">
                                        <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
                                            <span className="text-sm font-medium">NDVI Sensitivity</span>
                                            <span className="text-nature-leaf font-bold">{threshold}</span>
                                        </div>
                                        <input 
                                            type="range" 
                                            min="0" 
                                            max="1" 
                                            step="0.05" 
                                            value={threshold} 
                                            onChange={(e) => setThreshold(parseFloat(e.target.value))}
                                            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-nature-leaf"
                                        />
                                        <button 
                                            onClick={onUpload}
                                            disabled={loading}
                                            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg
                                                ${loading ? 'bg-nature-leaf/50 cursor-not-allowed' : 'bg-nature-leaf hover:bg-nature-accent shadow-nature-leaf/20'}`}
                                        >
                                            {loading ? (
                                                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>
                                                    <RefreshCcw className="w-5 h-5" />
                                                </motion.div>
                                            ) : (
                                                <>Process Imagery <Leaf className="w-5 h-5" /></>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        <div className="glass p-4 rounded-2xl flex items-start gap-3">
                            <Info className="w-5 h-5 text-nature-leaf shrink-0 mt-1" />
                            <p className="text-xs leading-relaxed text-nature-beige/70">
                                <b>How it works:</b> NDVI values range from -1 to 1. Positive values indicate healthy vegetation (chlorophyll absorption). 
                                We use a green-channel algorithm to simulate NIR imagery for standard RGB cameras.
                            </p>
                        </div>
                    </div>

                    {/* Right: Results */}
                    <div className="lg:col-span-12 xl:col-span-8">
                        <AnimatePresence mode='wait'>
                            {!results ? (
                                <motion.div 
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-full min-h-[500px] glass rounded-3xl flex flex-col items-center justify-center text-center p-10 border-dashed border-2 border-white/5"
                                >
                                    <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                        <Trees className="w-12 h-12 text-nature-leaf/30" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-nature-beige/20">Waiting for data input...</h3>
                                    <p className="text-nature-beige/10 mt-2">Upload a forest or field photo to begin analysis</p>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="results"
                                    initial={{ scale: 0.95, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="space-y-6"
                                >
                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="glass p-5 rounded-2xl border-l-4 border-nature-leaf text-center">
                                            <p className="text-xs text-nature-beige/50 uppercase tracking-widest tracking-tighter">Vegetation Health Index</p>
                                            <h4 className="text-3xl font-black mt-1 text-nature-leaf">{results.health_percentage.toFixed(2)}%</h4>
                                        </div>
                                        <div className="glass p-5 rounded-2xl border-l-4 border-yellow-500 text-center">
                                            <p className="text-xs text-nature-beige/50 uppercase tracking-widest tracking-tighter">Peak NDVI Value</p>
                                            <h4 className="text-3xl font-black mt-1 text-yellow-500">{results.peak_ndvi.toFixed(3)}</h4>
                                        </div>
                                        <div className="glass p-5 rounded-2xl bg-nature-leaf/10 border border-nature-leaf/30 flex items-center justify-between">
                                            <div>
                                                <p className="text-xs text-nature-beige/70">Analysis Mode</p>
                                                <p className="font-bold text-nature-leaf flex items-center gap-1 text-xs">
                                                    <CheckCircle2 className="w-4 h-4" /> Green-NIR Proxy
                                                </p>
                                            </div>
                                            <a 
                                                href={`data:image/png;base64,${results.ndvi_heatmap}`} 
                                                download="ndvi_analysis.png"
                                                className="p-2 bg-nature-leaf/20 rounded-lg hover:bg-nature-leaf/40 transition-colors"
                                                title="Download Result"
                                            >
                                                <Download className="w-5 h-5 text-nature-leaf" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Legend and NIR Label */}
                                    <div className="flex flex-wrap justify-between items-center gap-4 py-2 px-4 glass rounded-2xl text-[10px] font-bold">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-red-500 rounded-full"></div> Unhealthy</span>
                                            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-yellow-400 rounded-full"></div> Moderate</span>
                                            <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-600 rounded-full"></div> Healthy</span>
                                        </div>
                                        <p className="text-nature-leaf italic opacity-80 uppercase tracking-widest">
                                            NIR is approximated using the Green channel
                                        </p>
                                    </div>

                                    {/* Image Compare */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="glass-matte p-4 rounded-3xl relative overflow-hidden">
                                            <span className="inline-block px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold uppercase tracking-widest mb-3">NDVI Spectral Heatmap</span>
                                            <img 
                                                src={`data:image/png;base64,${results.ndvi_heatmap}`} 
                                                alt="NDVI Heatmap" 
                                                className="w-full rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500 border border-white/10" 
                                            />
                                        </div>
                                        <div className="glass-matte p-4 rounded-3xl relative overflow-hidden">
                                            <span className="inline-block px-3 py-1 bg-white/5 rounded-lg text-[10px] font-bold uppercase tracking-widest mb-3">Health Segmentation (R/G)</span>
                                            <img 
                                                src={`data:image/png;base64,${results.segmented_image}`} 
                                                alt="Segmented" 
                                                className="w-full rounded-2xl shadow-xl hover:scale-[1.02] transition-transform duration-500 border border-white/10" 
                                            />
                                        </div>
                                    </div>

                                    {/* NDVI Scale */}
                                    <div className="glass p-6 rounded-3xl">
                                        <div className="flex justify-between text-xs font-bold mb-2">
                                            <span className="text-red-400">NON-VEGETATED (-1.0)</span>
                                            <span className="text-nature-leaf">HEALTHY DENSE FOLIAGE (+1.0)</span>
                                        </div>
                                        <div className="h-4 w-full rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-600 shadow-inner" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </main>

            <footer className="mt-20 opacity-30 text-sm">
                &copy; 2026 NatureMonitor NDVI Systems • Bio-Tech Division
            </footer>

            {/* Loading Overlay */}
            <AnimatePresence>
                {loading && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-nature-dark/80 backdrop-blur-md"
                    >
                        <motion.div 
                            animate={{ rotate: 360 }} 
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="w-20 h-20 border-4 border-nature-leaf border-t-transparent rounded-full flex items-center justify-center shadow-lg shadow-nature-leaf/20"
                        >
                            <Leaf className="w-10 h-10 text-nature-leaf" />
                        </motion.div>
                        <p className="mt-6 text-nature-leaf font-bold tracking-widest animate-pulse uppercase">
                            Analyzing Spectral Data...
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default App;
