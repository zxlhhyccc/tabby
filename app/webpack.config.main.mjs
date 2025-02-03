import * as path from 'path'
import wp from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import * as url from 'url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const config = {
    name: 'tabby-main',
    target: 'electron-main',
    entry: {
        main: path.resolve(__dirname, 'lib/index.ts'),
    },
    mode: process.env.TABBY_DEV ? 'development' : 'production',
    context: __dirname,
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        pathinfo: true,
        filename: '[name].js',
    },
    resolve: {
        modules: ['lib/', 'node_modules', '../node_modules'].map(x => path.join(__dirname, x)),
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: path.resolve(__dirname, 'tsconfig.main.json'),
                    },
                },
            },
        ],
    },
    externals: {
        'v8-compile-cache': 'commonjs v8-compile-cache',
        'any-promise': 'commonjs any-promise',
        electron: 'commonjs electron',
        'electron-config': 'commonjs electron-config',
        'electron-debug': 'commonjs electron-debug',
        'electron-promise-ipc': 'commonjs electron-promise-ipc',
        'electron-updater': 'commonjs electron-updater',
        fs: 'commonjs fs',
        glasstron: 'commonjs glasstron',
        mz: 'commonjs mz',
        npm: 'commonjs npm',
        'node:os': 'commonjs os',
        'node-pty': 'commonjs node-pty',
        path: 'commonjs path',
        util: 'commonjs util',
        'source-map-support': 'commonjs source-map-support',
        'windows-swca': 'commonjs windows-swca',
        'windows-native-registry': 'commonjs windows-native-registry',
        '@tabby-gang/windows-blurbehind': 'commonjs @tabby-gang/windows-blurbehind',
        'yargs/yargs': 'commonjs yargs/yargs',
    },
    plugins: [
        new wp.optimize.ModuleConcatenationPlugin(),
        new wp.DefinePlugin({
            'process.type': '"main"',
        }),
    ],
}

if (process.env.BUNDLE_ANALYZER) {
    config.plugins.push(new BundleAnalyzerPlugin())
}

export default () => config
