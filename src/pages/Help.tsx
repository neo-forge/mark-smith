import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Edit, Eye, Download, Lightbulb, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const Help: React.FC = () => {
  const steps = [
    {
      icon: Upload,
      title: '上传图片',
      description: '拖拽图片到上传区域或点击选择文件，支持 JPG、PNG 格式',
      tips: ['建议使用高分辨率图片获得更好效果', '可以点击"加载示例图片"快速体验']
    },
    {
      icon: Edit,
      title: '编辑水印',
      description: '在编辑面板中自定义水印文字、字体、颜色、大小等属性',
      tips: ['透明度建议设置在30%-70%之间', '选择与图片对比度高的颜色']
    },
    {
      icon: Eye,
      title: '实时预览',
      description: '在预览画布中查看水印效果，支持缩放和拖拽调整位置',
      tips: ['点击画布可快速调整水印位置', '使用九宫格进行精确定位']
    },
    {
      icon: Download,
      title: '导出图片',
      description: '选择输出格式和质量，一键下载带水印的图片',
      tips: ['PNG格式支持透明背景', 'JPG格式文件更小，适合分享']
    }
  ];

  const features = [
    {
      title: '拖拽上传',
      description: '支持直接拖拽图片文件到上传区域'
    },
    {
      title: '实时预览',
      description: '所有修改都会实时显示在预览画布中'
    },
    {
      title: '九宫格定位',
      description: '快速将水印定位到图片的九个常用位置'
    },
    {
      title: '自由拖拽',
      description: '在预览画布中直接拖拽调整水印位置'
    },
    {
      title: '多种字体',
      description: '提供多种字体选择，满足不同设计需求'
    },
    {
      title: '颜色预设',
      description: '内置常用颜色，也支持自定义颜色选择'
    },
    {
      title: '透明度调节',
      description: '精确控制水印透明度，平衡保护与美观'
    },
    {
      title: '旋转功能',
      description: '支持-180°到180°的任意角度旋转'
    },
    {
      title: '多格式导出',
      description: '支持PNG和JPG格式，可调节压缩质量'
    }
  ];

  const examples = [
    {
      title: '摄影作品保护',
      description: '为摄影作品添加署名水印，防止盗用',
      watermark: '© 2024 摄影师姓名'
    },
    {
      title: '社交媒体分享',
      description: '为分享图片添加个人标识或网站链接',
      watermark: '@用户名'
    },
    {
      title: '商业用途',
      description: '为产品图片添加品牌标识或联系方式',
      watermark: '品牌名称 | 联系电话'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* 背景装饰 */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* 头部 */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回主页
          </Link>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            使用指南
          </h1>
          <p className="text-lg text-gray-600">
            了解如何使用图片水印工具，快速为您的图片添加专业水印
          </p>
        </motion.div>

        {/* 使用步骤 */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">使用步骤</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  className="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mr-3">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {step.description}
                  </p>
                  
                  <div className="space-y-1">
                    {step.tips.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-start text-sm text-gray-500">
                        <Lightbulb className="w-3 h-3 mr-1 mt-0.5 text-yellow-500" />
                        <span>{tip}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* 功能特色 */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">功能特色</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/70 backdrop-blur-md rounded-lg p-4 shadow-lg border border-white/20"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center mb-2">
                  <Star className="w-4 h-4 text-yellow-500 mr-2" />
                  <h3 className="font-semibold text-gray-800">{feature.title}</h3>
                </div>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 应用示例 */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">应用示例</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {examples.map((example, index) => (
              <motion.div
                key={index}
                className="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {example.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {example.description}
                </p>
                <div className="bg-gray-100 rounded-lg p-3 border-l-4 border-blue-400">
                  <p className="text-sm text-gray-700 font-mono">
                    示例水印: {example.watermark}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 底部提示 */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20 inline-block">
            <p className="text-gray-600">
              还有疑问？欢迎
              <Link to="/" className="text-blue-600 hover:text-blue-700 mx-1">
                返回主页
              </Link>
              开始体验！
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Help;