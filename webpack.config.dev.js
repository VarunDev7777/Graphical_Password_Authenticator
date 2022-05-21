const { resolve } = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'development',
    devServer: {
        host: 'localhost',
        port: 8080,
        allowedHosts: 'all',
        historyApiFallback: true,
        compress: true,
        static: {
            directory: resolve(__dirname),
        },
        hot: true,
    },
    entry: {
        main: resolve(__dirname, 'src', 'index.js')
    },
    externals: {
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/',
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: { loader: 'babel-loader' }
            },
            {
                test: /\.(s[ac]ss|css)$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(woff(2)?|ttf|eot|pdf)(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/resource',
                generator: {
                    filename: '[name][ext]'
                }
            },
            {
                test: /\.(png|jpg|gif|svg|webp|jpeg)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 15360,
                        name: '[path][name].[ext]'
                    }
                }
            }
        ]
    },
    resolve: {
        fallback: {
            fs: false
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            inject: true,
            template: resolve(__dirname, 'src', 'index.html')
        })
    ]
}