import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    basicSsl(),
    VitePWA({
      // 使用的缓存策略，支持 "injectManifest" 和 "generateSW"
      // "injectManifest"：允许你自定义 Service Worker 逻辑，手动编写 sw.ts 文件
      // "generateSW"：自动生成 Service Worker 文件
      strategies: "injectManifest", 
      
      // 指定 Service Worker 的源文件所在目录
      // 这里表示 Service Worker 文件在项目的 "src" 目录下
      srcDir: "src",
    
      // 定义 Service Worker 文件的文件名
      // 在 "src" 目录中，使用 "sw.ts" 作为 Service Worker 文件
      filename: "sw.ts",
    
      // 设置注册类型
      // "prompt"：用户需要手动确认安装
      // "autoUpdate"：浏览器在检测到更新时会自动更新 Service Worker
      registerType: "prompt",
    
      // 控制是否自动注册 Service Worker
      // false 表示不自动注册，需要手动调用注册逻辑
      injectRegister: false,
    
      // 配置 PWA 资源
      // 该选项允许你指定哪些资源需要缓存，以及其他缓存相关的配置
      pwaAssets: {
        // 是否禁用 PWA 资产
        disabled: false,  // false 表示启用 PWA 资产缓存
    
        // 是否启用配置文件
        config: true,
      },
    
      // 应用程序的 manifest 文件配置
      manifest: {
        // PWA 应用的完整名称
        name: "HELLO",
    
        // PWA 应用的短名称
        short_name: "HELLO",
    
        // 应用程序的描述
        description: "HELLO",
    
        // 应用程序的主题颜色，通常用于控制浏览器地址栏的颜色
        theme_color: "#fff",
    
        // PWA 应用的显示模式
        // "standalone"：以独立应用的形式运行，隐藏浏览器的 UI
        display: "standalone",
    
        // 应用的启动 URL
        // 通过点击桌面图标启动时的 URL，这里使用相对路径
        start_url: './',
    
        // 配置自定义协议处理器
        // 允许 PWA 通过自定义协议打开特定 URL
        protocol_handlers: [
          {
            // 自定义的协议名
            protocol: `web+pwa`,
    
            // 使用自定义协议时，浏览器会根据协议打开的 URL
            // %s 表示 URL 中的自定义数据
            url: "/?number=%s",
          },
        ],
    
        // 配置应用的启动处理器
        // 控制应用在打开链接时的行为
        launch_handler: {
          // 设置打开模式
          // "focus-existing"：如果应用已经在运行，则聚焦现有的应用实例
          client_mode: "focus-existing",
        },
      },
    
      // 使用 Workbox 进行 PWA 的缓存管理
      workbox: {
        // 配置要缓存的资源文件
        // 这里表示缓存所有 `.js`, `.css`, `.html`, `.svg`, `.png`, 和 `.ico` 文件
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
    
        // 自动清理过时的缓存
        cleanupOutdatedCaches: true,
    
        // 让 Service Worker 立即接管所有页面，而不是等待下一次页面刷新
        clientsClaim: true,
      },
    })    
  ],
})