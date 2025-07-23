import React from 'react';
import { motion } from 'framer-motion';
import { Type, Palette, RotateCw, Move } from 'lucide-react';
import { useWatermarkStore } from '../stores/watermarkStore';

const WatermarkEditor: React.FC = () => {
  const { watermark, updateWatermark } = useWatermarkStore();

  const fontOptions = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Verdana', label: 'Verdana' },
    { value: 'Courier New', label: 'Courier New' }
  ];

  const colorPresets = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'
  ];

  return (
    <motion.div
      className="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center mb-6">
        <Type className="w-5 h-5 text-purple-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">水印编辑</h3>
      </div>

      <div className="space-y-6">
        {/* 文字输入 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            水印文字
          </label>
          <input
            type="text"
            value={watermark.text}
            onChange={(e) => updateWatermark({ text: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all duration-200 bg-white/50"
            placeholder="输入水印文字"
          />
        </div>

        {/* 字体选择 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            字体
          </label>
          <select
            value={watermark.fontFamily}
            onChange={(e) => updateWatermark({ fontFamily: e.target.value })}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition-all duration-200 bg-white/50"
          >
            {fontOptions.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        {/* 字体大小 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            字体大小: {watermark.fontSize}px
          </label>
          <input
            type="range"
            min="12"
            max="72"
            value={watermark.fontSize}
            onChange={(e) => updateWatermark({ fontSize: parseInt(e.target.value) })}
            className="w-full h-2 bg-gradient-to-r from-purple-200 to-blue-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* 颜色选择 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Palette className="w-4 h-4 inline mr-1" />
            颜色
          </label>
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={watermark.color}
              onChange={(e) => updateWatermark({ color: e.target.value })}
              className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer"
            />
            <div className="flex flex-wrap gap-2">
              {colorPresets.map((color) => (
                <motion.button
                  key={color}
                  onClick={() => updateWatermark({ color })}
                  className={`w-6 h-6 rounded-full border-2 ${
                    watermark.color === color ? 'border-gray-400' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 透明度 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            透明度: {Math.round(watermark.opacity * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={watermark.opacity}
            onChange={(e) => updateWatermark({ opacity: parseFloat(e.target.value) })}
            className="w-full h-2 bg-gradient-to-r from-purple-200 to-blue-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* 旋转角度 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <RotateCw className="w-4 h-4 inline mr-1" />
            旋转角度: {watermark.rotation}°
          </label>
          <input
            type="range"
            min="-180"
            max="180"
            value={watermark.rotation}
            onChange={(e) => updateWatermark({ rotation: parseInt(e.target.value) })}
            className="w-full h-2 bg-gradient-to-r from-purple-200 to-blue-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* 位置调节 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Move className="w-4 h-4 inline mr-1" />
            位置调节
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-600 mb-1">水平位置: {watermark.x}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={watermark.x}
                onChange={(e) => updateWatermark({ x: parseInt(e.target.value) })}
                className="w-full h-2 bg-gradient-to-r from-purple-200 to-blue-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">垂直位置: {watermark.y}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={watermark.y}
                onChange={(e) => updateWatermark({ y: parseInt(e.target.value) })}
                className="w-full h-2 bg-gradient-to-r from-purple-200 to-blue-200 rounded-lg appearance-none cursor-pointer slider"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default WatermarkEditor;