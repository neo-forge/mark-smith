import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Eye, ZoomIn, ZoomOut } from 'lucide-react';
import { useWatermarkStore } from '../stores/watermarkStore';

const ImagePreview: React.FC = () => {
  const { image, watermark, updateWatermark } = useWatermarkStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // 设置画布尺寸
      canvas.width = img.width;
      canvas.height = img.height;

      // 清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 绘制图片
      ctx.drawImage(img, 0, 0);

      // 绘制水印
      if (watermark.text) {
        ctx.save();
        
        // 设置字体样式
        ctx.font = `${watermark.fontSize}px ${watermark.fontFamily}`;
        ctx.fillStyle = watermark.color;
        ctx.globalAlpha = watermark.opacity;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // 计算水印位置
        const x = (watermark.x / 100) * canvas.width;
        const y = (watermark.y / 100) * canvas.height;

        // 应用旋转
        ctx.translate(x, y);
        ctx.rotate((watermark.rotation * Math.PI) / 180);
        
        // 绘制水印文字
        ctx.fillText(watermark.text, 0, 0);
        
        ctx.restore();
      }
    };
    img.src = image;
  }, [image, watermark]);

  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setIsDragging(true);
    setDragStart({ x, y });
    updateWatermark({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  }, [updateWatermark]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    updateWatermark({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  }, [isDragging, updateWatermark]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));

  if (!image) {
    return (
      <motion.div
        className="bg-white/70 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/20 flex flex-col items-center justify-center min-h-[400px]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Eye className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-gray-500 text-lg">请先上传图片</p>
        <p className="text-gray-400 text-sm mt-2">上传图片后即可预览水印效果</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Eye className="w-5 h-5 text-green-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">实时预览</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            onClick={handleZoomOut}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ZoomOut className="w-4 h-4" />
          </motion.button>
          
          <span className="text-sm text-gray-600 min-w-[60px] text-center">
            {Math.round(zoom * 100)}%
          </span>
          
          <motion.button
            onClick={handleZoomIn}
            className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ZoomIn className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg bg-gray-50 border-2 border-gray-200">
        <div 
          className="overflow-auto max-h-[500px] flex items-center justify-center p-4"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          <canvas
            ref={canvasRef}
            className="max-w-full h-auto shadow-lg rounded"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          点击画布调整水印位置 · 使用缩放按钮查看细节
        </p>
      </div>
    </motion.div>
  );
};

export default ImagePreview;