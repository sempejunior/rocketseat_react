const path = require('path')
const HtmlWebpackPlugin = require ('html-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production';
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname,'src', 'index.tsx'),
    mode: isDevelopment? 'development': 'production',
    //Facilita o entendimento do código dentro do console do browser
    devtool: isDevelopment? 'eval-source-map': 'source-map',
    output:{
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js'
    },
    resolve:{
        extensions: [".wasm", ".ts", ".tsx", ".mjs", ".cjs", ".js", ".json", ".jsx"],
    },
    devServer: {
        static: {
          directory: path.join(__dirname, "public")
        },
        hot: true
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html')
        }),
        isDevelopment && new ReactRefreshWebpackPlugin()
    ].filter(Boolean),
    module:{
        rules:[
            {
                test: /\.(j|t)sx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options:{
                        plugins: [
                            isDevelopment && require.resolve('react-refresh/babel')
                        ].filter(Boolean)
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            
        ]
    }
}