module.exports = {
  distPath: './.dist/',
  buildPath: './build/',
  sassIncludePaths: [
    './bower_components/Ionicons/css/',
    './node_modules/ress/dist/',
    './node_modules/swiper/dist/css/',
    './node_modules/font-awesome/css/',
  ],
  autoprefixerSetting: ['last 4 versions', 'ie >= 9', 'Android >= 4', 'ios_saf >= 8'],
  ejsOption: {
    root: './source/',
  },
  port: 3333,
};
