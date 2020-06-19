import {createConnection} from "https://denolib.com/denolib/typeorm@v0.2.23-rc4/mod.ts";
import {Project} from "./entity/Project.ts";


createConnection().then(async connection => {

    console.log("Inserting a new project into the database...");
    // const project = new Project();
    // project.name = "Project1";
    // await connection.manager.save(project);
    // console.log("Saved a new project with id: " + project.id);

    // console.log("Loading projects from the database...");
    // const projects = await connection.manager.find(Project);
    // console.log("Loaded projects: ", projects);
    //
    // console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
