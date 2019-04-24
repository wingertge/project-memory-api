import {createLogger} from "bunyan"
import {LoggingBunyan} from "@google-cloud/logging-bunyan"

export type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal"

const loggingBunyan = process.env.GCP_PROJECT && new LoggingBunyan()


export const makeLogger = (name: string, level: LogLevel = "debug") => createLogger({
    name,
    streams: loggingBunyan ? [
        {stream: process.stdout, level},
        loggingBunyan.stream(level)
    ] : [
        {stream: process.stdout, level},
    ]
})

export default makeLogger
