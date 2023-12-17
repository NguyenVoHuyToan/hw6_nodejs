import { validationResult } from "express-validator";

export const validator = (validation) => {
  return async (req, res, next) => {
    await validation.run(req);
    const result = validationResult(req).mapped();
    if (Object.values(result).length > 0) {
      next(result);
    }
    next();
  };
};

