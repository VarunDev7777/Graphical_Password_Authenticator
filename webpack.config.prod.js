const { resolve } = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        main: resolve(__dirname, 'src', 'index.js')
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/',
    },
    optimization: {
        usedExports: true,
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
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/resource',
                generator: {
                    filename: '[name][ext]'
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/i,
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
    externals: {
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CompressionPlugin({
            filename: '[path][base].gz',
            algorithm: "gzip",
            test: /\.js(\?.*)?$/i,
            threshold: 10240,
            minRatio: 0.8,
            exclude: /.map$/,
            deleteOriginalAssets: 'keep-source-map',
        }),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            inject: true,
            template: resolve(__dirname, 'src', 'index.html')
        })
    ]
}