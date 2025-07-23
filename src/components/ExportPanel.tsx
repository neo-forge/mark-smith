import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Download, FileImage, Settings, CheckCircle } from 'lucide-react';
import { useWatermarkStore } from '../stores/watermarkStore';
import { toast } from 'sonner';

const ExportPanel: React.FC = () => {
  const { image, watermark } = useWatermarkStore();
  const [format, setFormat] = useState<'png' | 'jpg'>('png');
  const [quality, setQuality] = useState(0.9);
  const [isExporting, setIsExporting] = useState(false);

  const exportImage = useCallback(async () => {
    if (!image) {
      toast.error('请先上传图片');
      return;
    }

    setIsExporting(true);
    
    try {
      // 创建临时画布
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('无法创建画布上下文');

      // 加载图片
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = image;
      });

      // 设置画布尺寸
      canvas.width = img.width;
      canvas.height = img.height;

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

      // 导出图片
      const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
      const dataUrl = canvas.toDataURL(mimeType, quality);
      
      // 创建下载链接
      const link = document.createElement('a');
      link.download = `watermarked-image.${format}`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('图片导出成功！');
    } catch (error) {
      console.error('导出失败:', error);
      toast.error('导出失败，请重试');
    } finally {
      setIsExporting(false);
    }
  }, [image, watermark, format, quality]);

  return (
    <motion.div
      className="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="flex items-center mb-6">
        <Download className="w-5 h-5 text-green-500 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">导出设置</h3>
      </div>

      <div className="space-y-6">
        {/* 格式选择 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <FileImage className="w-4 h-4 inline mr-1" />
            输出格式
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(['png', 'jpg'] as const).map((fmt) => (
              <motion.button
                key={fmt}
                onClick={() => setFormat(fmt)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                  format === fmt
                    ? 'border-green-400 bg-gradient-to-br from-green-100 to-blue-100 shadow-md'
                    : 'border-gray-200 bg-white/50 hover:border-green-300 hover:bg-green-50/50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-center space-x-2">
                  {format === fmt && <CheckCircle className="w-4 h-4 text-green-500" />}
                  <span className="font-medium text-gray-700 uppercase">{fmt}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {fmt === 'png' ? '无损压缩，支持透明' : '有损压缩，文件较小'}
                </p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* 质量设置 (仅JPG格式) */}
        {format === 'jpg' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Settings className="w-4 h-4 inline mr-1" />
              图片质量: {Math.round(quality * 100)}%
            </label>
            <input
              type="range"
              min="0.1"
              max="1"
              step="0.1"
              value={quality}
              onChange={(e) => setQuality(parseFloat(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-green-200 to-blue-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>较小文件</span>
              <span>较高质量</span>
            </div>
          </div>
        )}

        {/* 导出按钮 */}
        <motion.button
          onClick={exportImage}
          disabled={!image || isExporting}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            !image || isExporting
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-400 to-blue-400 text-white hover:from-green-500 hover:to-blue-500 shadow-lg hover:shadow-xl'
          }`}
          whileHover={!image || isExporting ? {} : { scale: 1.02 }}
          whileTap={!image || isExporting ? {} : { scale: 0.98 }}
        >
          <div className="flex items-center justify-center space-x-2">
            {isExporting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>导出中...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>下载图片</span>
              </>
            )}
          </div>
        </motion.button>

        {!image && (
          <p className="text-center text-sm text-gray-500">
            请先上传图片后再导出
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default ExportPanel;