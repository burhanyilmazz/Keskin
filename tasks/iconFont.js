const iconfontMaker = require('iconfont-maker');

iconfontMaker({
  files: [
    'assets/icons/*.svg'
  ],
  types: [
    'ttf'
  ],
  order: ['ttf'],
  fontName: 'keskin',
  dest: 'assets/fonts',
  cssDest: 'assets/styles/icons.scss',
  cssTemplate: 'tasks/iconTemp.hbs',
  cssFontsUrl: './../public/fonts/'
}, function (error) {
  if (error) {
    console.log('Fail!', error);
  } else {
    console.log('Done!');
  }
})

