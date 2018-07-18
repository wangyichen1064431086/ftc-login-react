import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import postcss from 'rollup-plugin-postcss';
import minify from 'rollup-plugin-minify-es';
import cssdiscardcomments from 'postcss-discard-comments';
export default {
  input: './src/js/Login.js',
  output:[
    {
      name:'FtcLogin',
      sourcemap: true,
      
      globals:{
        react: 'React',
        'react-dom': 'ReactDOM',
        'prop-types':'PropTypes',
        'classnames':'classnames',
        'react-css-modules':'CSSModules'
      },
      file: './build/index.js', 
      format: 'umd'
    },

    {
      //name只对umd/iife有效，所以这里也不用加了
    
      sourcemap: true,
      file: './build/index.es.js',
      format: 'es'
      
      //globals只对于umd/iife有效，所以这里不用加了
    },
  ],


  plugins: [
    
    postcss({
      modules: true,
      plugins: [
        cssdiscardcomments()
      ]
    }),
    
    babel({
      exclude: 'node_modules/**'
    }),
    /*
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    */
    resolve({
      jsnext: true,
      main:true
    }),
    commonjs({
      /*
      namedExports: {
        'node_modules/immutable/dist/immutable.js':['Seq']
      }
      */
    }),
    minify({
      compress: {
        drop_console:true
      }
    })

  ],

  external: ['react', 'react-dom','prop-types','classnames','react-css-modules']
  
}