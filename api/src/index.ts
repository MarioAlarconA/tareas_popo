import app from "./app";
import mongoose from "mongoose";

async function main(){
    try {
        await mongoose.connect(
            "mongodb://127.0.0.1:27017/ToDoList"
        );
        console.log("Aplicación conectada a la base de datos")
        app.listen(4000, () => {
            console.log("Aplicación corriendo con exito")
        })
    } catch (error) {
        console.log("Algo salio mal con la base de datos")
        
    }
}
main();