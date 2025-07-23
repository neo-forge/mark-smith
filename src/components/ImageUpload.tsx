import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useWatermarkStore } from '../stores/watermarkStore';

const ImageUpload: React.FC = () => {
  const { setImage, setLoading } = useWatermarkStore();
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileUpload = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('请选择图片文件');
      return;
    }

    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setLoading(false);
    };
    reader.readAsDataURL(file);
  }, [setImage, setLoading]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const loadSampleImage = useCallback(() => {
    // 使用示例图片URL
    const sampleImageUrl = 'https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=beautiful%20landscape%20mountain%20lake%20sunset%20peaceful%20nature&image_size=landscape_4_3';
    setImage(sampleImageUrl);
  }, [setImage]);

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">上传图片</h2>
        <motion.button
          onClick={loadSampleImage}
          className="px-4 py-2 text-sm bg-gradient-to-r from-blue-100 to-purple-100 text-blue-600 rounded-lg hover:from-blue-200 hover:to-purple-200 transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ImageIcon className="w-4 h-4 inline mr-2" />
          加载示例图片
        </motion.button>
      </div>
      
      <motion.div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          isDragOver 
            ? 'border-blue-400 bg-blue-50/50' 
            : 'border-gray-300 bg-white/50'
        } backdrop-blur-sm shadow-lg hover:shadow-xl`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <motion.div
          className="flex flex-col items-center space-y-4"
          animate={{ scale: isDragOver ? 1.1 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-blue-500" />
          </div>
          
          <div className="space-y-2">
            <p className="text-lg font-medium text-gray-700">
              {isDragOver ? '松开鼠标上传图片' : '拖拽图片到此处'}
            </p>
            <p className="text-sm text-gray-500">
              或点击选择文件 · 支持 JPG、PNG 格式
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ImageUpload;