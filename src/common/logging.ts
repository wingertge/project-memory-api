import {createLogger} from "bunyan"
import {LoggingBunyan} from "@google-cloud/logging-bunyan"
import PrettyStream from "bunyan-prettystream"

export type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal"

const loggingBunyan = process.env.GCP_PROJECT && new LoggingBunyan()
let prettyStdOut: PrettyStream | undefined
if(!loggingBunyan) {
    prettyStdOut = new PrettyStream()
    prettyStdOut.pipe(process.stdout)
}

export const makeLogger = (name: string, level: LogLevel = "debug") => createLogger({
    name,
    streams: loggingBunyan ? [
        {stream: process.stdout, level},
        loggingBunyan.stream(level)
    ] : [
        {stream: prettyStdOut, level, type: "raw"},
    ]
})

export default makeLogger
