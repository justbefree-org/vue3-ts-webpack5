const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "node_modules/awesome-scss-bem/src/bem.scss";@import "@/theme/global.scss";`,
      },
    },
  },
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "https://yesno.wtf",
        changeOrigin: true,
      },
    },
  },
});
