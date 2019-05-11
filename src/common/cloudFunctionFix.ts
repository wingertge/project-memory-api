import {NextFunction, Request, Response} from "express"
import makeLogger from "./logging"
import toStream from "buffer-to-stream"

const logger = makeLogger("custom-middleware")

export const cloudFunctionFix = (req: Request & {rawBody?: Buffer}, res: Response, next: NextFunction) => {
    if(process.env.IS_SERVERLESS && req.is("multipart/form-data")) {
        logger.debug("Overriding pipe")
        const bodyStream = toStream(req.rawBody)
        req.pipe = bodyStream.pipe.bind(bodyStream)
    }
    next()
}
