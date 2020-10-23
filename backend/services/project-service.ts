import type { CrudService } from "./crud-service.ts";
import type { Project } from "../../frontend/target/model/board.ts";
import { Project as ProjectDb } from "../../database/mod.ts";

export class ProjectService implements CrudService<Project> {
  async create(project: Project): Promise<Project> {
    return ProjectDb.create({ ...project, people: project.people.join(",") });
  }

  delete(id: Project["id"]): Promise<void> {
    return ProjectDb.deleteById(id);
  }

  get(id: Project["id"]): Promise<Project> {
    return ProjectDb.find(id).then((project) => ({
      ...project,
      people: project.people ? project.people.split(",") : [],
    }));
  }

  getAll(): Promise<Project[]> {
    return ProjectDb.all().then((px) =>
      px.map((project: any) => ({
        ...project,
        people: project.people ? project.people.split(",") : [],
      }))
    );
  }

  async update(
    id: Project["id"],
    mutation: Partial<Project>,
  ): Promise<Project> {
    const project = await ProjectDb.find(id);
    const people = mutation.people ? mutation.people.join(",") : project.people;
    await ProjectDb.deleteById(project.id);
    return ProjectDb.update(id, {
      ...project,
      ...mutation,
      people,
    });
  }

  async updateAll(entities: Project[]): Promise<void> {
    await Promise.all(entities.map((it) => this.update(it.id, it)));
  }
}
