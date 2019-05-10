import {NextFunction, Request, Response} from "express"
import makeLogger from "./logging"
import toStream from "buffer-to-stream"

const logger = makeLogger("custom-middleware")

export const cloudFunctionFix = (req: Request & {rawBody?: Buffer}, res: Response, next: NextFunction) => {
    if(req.is("multipart/form-data") && process.env.IS_SERVERLESS) {
        logger.debug("Overriding pipe")
        const bodyStream = toStream(req.rawBody)
        req.pipe = bodyStream.pipe.bind(bodyStream)
    }
    next()
/*    if (!req.is("multipart/form-data") || !req.rawBody) return next()

    logger.debug(req.rawBody.toString())
    req.body = req.rawBody*/
}
