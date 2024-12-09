import express, { Application, Request, Response } from "express";
import cors from "cors";
import { registerUsers, singIn } from "./controllers/UserControllers";
import { createHw, getHomeworks, getMetrics, deleteHomework} from "./controllers/HomeworkControllers";
import { updateHomework } from "./controllers/EditController";



const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
    res.send("Hola desde mi servidor con taipscrip");
})

app.post("/users/create", registerUsers)
app.post("/users/sign-in", singIn)
app.post("/homework/create", createHw)
app.get("/homework/get-metrics", getMetrics)
app.get("/homeworks/get-all", getHomeworks)
app.put("/homeworks/update", updateHomework);
app.delete("/homeworks/delete/:id", deleteHomework);

export default app;