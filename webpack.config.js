const serverlessWebpack = require("serverless-webpack")
const nodeExternals = require("webpack-node-externals")
const path = require("path")

module.exports = {
    entry: "./src/serverless-index.ts",
    externals: [nodeExternals()],
    mode: "production",
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.ts$/,
                use: [
                    "imports-loader?graphql",
                    "ts-loader",
                ],
            },
            {
                test: /\.graphql?$/,
                loader: "webpack-graphql-loader",
                options: {
                    output: "string"
                }
            }
        ],
    },
    output: {
        filename: "index.js",
        libraryTarget: "commonjs",
        path: path.join(__dirname, ".webpack"),
    },
    resolve: {
        extensions: [".ts", ".js", ".graphql"],
    },
    target: "node",
}
