const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');


module.exports = {
    entry: {
        background: path.join(__dirname, 'src', 'scripts', 'background.js'),
        popup: path.join(__dirname, 'src', 'scripts', 'popup.js'),
        options: path.join(__dirname, 'src', 'scripts', 'options.js'),
        mypage: path.join(__dirname, 'src', 'scripts', 'mypage.js'),
        atcoder: path.join(__dirname, 'src', 'scripts', 'atcoder.js'),
        codeforces: path.join(__dirname, 'src', 'scripts', 'codeforces.js')
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'scripts/[name].bundle.js',
    },
    target: "web",
    resolve: {
        extensions: ['ts', '.js'],
        modules:
            [
                'node_modules',
                path.resolve(__dirname, 'src')
            ],
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9000,
        hot: true,
    },
    devtool: "cheap-module-source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {loader: 'babel-loader'}
            },
            {
                test: /\.vue$/,
                use: {loader: "vue-loader"}
            },
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.(sass|scss)$/,
                loader: [
                    'css-loader',
                    'sass-loader'
                ]
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin(
            [
                {
                    from: path.join(__dirname, 'src', 'manifest.json'),
                    to: path.join(__dirname, 'dist'),
                },
                {
                    from: path.join(__dirname, 'src', 'htmls'),
                    to: path.join(__dirname, 'dist/htmls')
                },
                {
                    from: path.join(__dirname, 'src', 'images'),
                    to: path.join(__dirname, 'dist/images')
                },
                {
                    from: path.join(__dirname, 'src', 'components'),
                    to: path.join(__dirname, 'dist/components')
                },
                {
                    from: path.join(__dirname, 'src', 'styles'),
                    to: path.join(__dirname, 'dist/styles')
                },
                {
                    from: path.join(__dirname, 'src', 'scripts', 'third'),
                    to: path.join(__dirname, 'dist', 'scripts', 'third')
                }
            ]
        ),
        new VueLoaderPlugin(),
    ]
}
