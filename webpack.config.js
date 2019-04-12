const serverlessWebpack = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
    entry: serverlessWebpack.lib.entries,
    externals: [nodeExternals()],
    mode: "development",
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
        ],
    },
    output: {
        filename: "[name].js",
        libraryTarget: "commonjs",
        path: path.join(__dirname, ".webpack"),
    },
    resolve: {
        extensions: [".ts", ".js", ".graphql"],
    },
    target: "node",
};
