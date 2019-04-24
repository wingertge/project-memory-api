import {createLogger} from "bunyan"
import {LoggingBunyan} from "@google-cloud/logging-bunyan"

export type LogLevel = "trace" | "debug" | "info" | "warn" | "error" | "fatal"

const loggingBunyan = new LoggingBunyan()
export const makeLogger = (name: string, level: LogLevel = "debug") => createLogger({
    name,
    streams: [
        {stream: process.stdout, level},
        loggingBunyan.stream(level)
    ]
})

export default makeLogger
