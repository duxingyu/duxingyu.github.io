module.exports = {
  https: true,
  // proxy: {
  //   '/clazz': {
  //     target: 'http://mytian.dyndns.org:7777/clazz'  
  //   },
  //   secure: false,
  //   changeOrigin: true
  // },
  plugins: [
    // {
    //   name: 'qrcode',
    //   options: {
    //     cli: false,
    //     ui: false,
    //     console: true
    //   },
    // },
    {
      name: 'localtunnel',
      options: {
          subdomain: 'svrx'
      }
    },
    // 'weinre',
    // 'eruda'
  ],
};