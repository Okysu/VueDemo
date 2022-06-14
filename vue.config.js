const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pages: {
    // 先配置主页
    index: {
      entry: './src/main.js',
      template: './public/index.html',
      title: '登录/注册',
      subtitle: 'Competition Go V1',
    },
    admin: {
      entry: './src/pages/admin/admin.js',
      template: './public/admin.html',
      title: '个人中心',
      subtitle: 'Competition Go V1',
    }
  }
})