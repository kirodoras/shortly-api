import { urlSchema } from "../schemas/urls.schema.js";

export async function validateUrl(req, res, next) {
  const { url } = req.body;
  const validationUrl = urlSchema.validate(url);

  if (validationUrl.error) {
    res.sendStatus(422);
    return;
  }

  next();
}