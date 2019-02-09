const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPresetEnv = require("postcss-preset-env");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    mode: devMode ? "development" : "production",
    entry: ["./src/styles/main.scss"],
    output: {
        path: path.resolve(__dirname, "src"),
        publicPath: "/styles",
        filename: "../dist/js/sass.js"
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.(sa|sc)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: devMode
                                ? () => []
                                : () => [
                                    postcssPresetEnv({
                                        browsers: [">1%"]
                                    }),
                                    require("cssnano")()
                                ]
                        }
                    },
                    {
                        loader: "sass-loader"
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            publicPath: "../images",
                            emitFile: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '../public/css/built/main.css'
        })
    ]
};