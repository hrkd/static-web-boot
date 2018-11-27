module.exports = {
  distPath: './.tmp/',
  buildPath: './build/',
  sassIncludePaths: ['./bower_components/Ionicons/css/', './node_modules/ress/dist/', './node_modules/swiper/dist/css/', './node_modules/font-awesome/css/'],
  autoprefixerSetting: ['last 4 versions', 'ie >= 9', 'Android >= 4', 'ios_saf >= 8'],
  ejsOption: {
    root: './source/',
    path: {
      production: {
        cssPath: '/stylesheets/styles.min.css',
        jsPath: '/javascripts/bundle.min.js'
      },
      development: {
        cssPath: '/stylesheets/styles.css',
        jsPath: '/javascripts/bundle.js'
      }
    }
  },
  port: 3333
};
