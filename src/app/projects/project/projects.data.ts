import { Project } from "./project.model";

export const PROJECTS: Project[] = [
    {
        id: 1,
        title: "Join",
        technologies: ["HMTL","CSS","JavaScript","Firebase"],
        description: "Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories",
        liveLink: "https://bjoern-bressler.de/developer/projects/join/",
        gitHubLink: "https://github.com/MatheGenie27/Join",
        imagePath: "assets/img/joinRedux.png"
    },
    {
        id:2,
        title: "El Pollo Loco",
        technologies:["HTML", "CSS", "JavaScript"],
        description:"Jump, run and throw game based on object oriented approach. Help Pepe to find coinds and tabasco salsa to fight against the crazy hen.",
        liveLink: "https://bjoern-bressler.de/developer/projects/el-pollo-loco/",
        gitHubLink:"https://github.com/MatheGenie27/el-pollo-loco2",
        imagePath:"assets/img/elPolloLocoRedux.png"
    }


]