import express, { Request, Response, NextFunction } from "express";
import path from "path";

const app = express();

app.use(express.static(path.join(__dirname, "../public")));

const clientRoute = (req: Request, res: Response, next: NextFunction): void => {
  console.log(`got request for ${req.url}`)
  try {
    res.sendFile("./index.html", { root: path.join(__dirname, "../public") });
  } catch (error) {
    next(error);
  }
}

app.get('/*', clientRoute)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
});