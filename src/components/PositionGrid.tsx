import React from 'react';
import { motion } from 'framer-motion';
import { Grid3X3 } from 'lucide-react';
import { useWatermarkStore } from '../stores/watermarkStore';

const PositionGrid: React.FC = () => {
  const { watermark, updateWatermark } = useWatermarkStore();

  const positions = [
    { x: 10, y: 10, label: '左上' },
    { x: 50, y: 10, label: '中上' },
    { x: 90, y: 10, label: '右上' },
    { x: 10, y: 50, label: '左中' },
    { x: 50, y: 50, label: '中心' },
    { x: 90, y: 50, label: '右中' },
    { x: 10, y: 90, label: '左下' },
    { x: 50, y: 90, label: '中下' },
    { x: 90, y: 90, label: '右下' }
  ];

  const isActive = (x: number, y: number) => {
    return Math.abs(watermark.x - x) <= 5 && Math.abs(watermark.y - y) <= 5;
  };

  return (
    <motion.div
      className="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center mb-4">
        <Grid3X3 className="w-5 h-5 text-blue-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">快速定位</h3>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {positions.map((position, index) => {
          const active = isActive(position.x, position.y);
          return (
            <motion.button
              key={index}
              onClick={() => updateWatermark({ x: position.x, y: position.y })}
              className={`relative h-12 rounded-lg border-2 transition-all duration-200 ${
                active
                  ? 'border-blue-400 bg-gradient-to-br from-blue-100 to-purple-100 shadow-md'
                  : 'border-gray-200 bg-white/50 hover:border-blue-300 hover:bg-blue-50/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className={`w-2 h-2 rounded-full ${
                    active ? 'bg-blue-500' : 'bg-gray-400'
                  }`}
                  animate={{ scale: active ? 1.2 : 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              </div>
              
              {/* 悬停时显示标签 */}
              <motion.div
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 pointer-events-none"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {position.label}
              </motion.div>
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          点击网格快速定位水印位置
        </p>
      </div>
    </motion.div>
  );
};

export default PositionGrid;