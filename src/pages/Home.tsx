import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HelpCircle, Sparkles } from 'lucide-react';
import { Toaster } from 'sonner';
import ImageUpload from '../components/ImageUpload';
import WatermarkEditor from '../components/WatermarkEditor';
import PositionGrid from '../components/PositionGrid';
import ImagePreview from '../components/ImagePreview';
import ExportPanel from '../components/ExportPanel';
import { useWatermarkStore } from '../stores/watermarkStore';

const Home: React.FC = () => {
  const { setImage } = useWatermarkStore();

  // 首次进入时加载示例图片
  useEffect(() => {
    const timer = setTimeout(() => {
      const sampleImageUrl = 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20landscape%20mountain%20lake%20sunset%20peaceful%20nature%20serene%20calm&image_size=landscape_4_3';
      setImage(sampleImageUrl);
    }, 1000);

    return () => clearTimeout(timer);
  }, [setImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      </div>

      <div className="relative z-10">
        {/* 头部 */}
        <motion.header
          className="container mx-auto px-4 py-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  图片水印工具
                </h1>
                <p className="text-sm text-gray-600">
                  轻松为图片添加专业水印
                </p>
              </div>
            </div>
            
            <Link
              to="/help"
              className="flex items-center space-x-2 px-4 py-2 bg-white/70 backdrop-blur-md rounded-lg shadow-lg border border-white/20 hover:bg-white/80 transition-all duration-200"
            >
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span className="text-blue-600 font-medium">使用帮助</span>
            </Link>
          </div>
        </motion.header>

        {/* 主要内容 */}
        <main className="container mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧面板 */}
            <div className="lg:col-span-1 space-y-6">
              <ImageUpload />
              <WatermarkEditor />
              <PositionGrid />
              <ExportPanel />
            </div>

            {/* 右侧预览区域 */}
            <div className="lg:col-span-2">
              <ImagePreview />
            </div>
          </div>
        </main>
      </div>

      {/* Toast 通知 */}
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
        }}
      />
    </div>
  );
};

export default Home;