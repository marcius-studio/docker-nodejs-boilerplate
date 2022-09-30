const path = require('path')
const webpack = require('webpack')

process.env.NODE_ENV = 'production'

module.exports = {
    target: 'node',
    mode: 'production',
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'server.js',
    },
    module: {
        rules: [
            {
                include: /node_modules/,
                test: /\.mjs$/,
                type: 'javascript/auto'
            }
        ]
    },
    resolve: {
        modules: [__dirname, 'node_modules'],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
                PORT: JSON.stringify(process.env.PORT),
                HOST: JSON.stringify(process.env.HOST),
                PRIVATE_KEY: JSON.stringify(process.env.PRIVATE_KEY)
            },
        }),
        // new webpack.LoaderOptionsPlugin({
        //     minimize: true,
        // }),
    ]
}