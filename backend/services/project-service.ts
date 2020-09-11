import { CrudService } from "./crud-service.ts";
import { Project } from "../../frontend/target/model/board.ts";
import { Project as ProjectDb } from "../../database/mod.ts";

export class ProjectService implements CrudService<Project> {
  async create(project: Project): Promise<Project> {
    return ProjectDb.create({ ...project });
  }

  delete(id: Project["id"]): Promise<void> {
    return ProjectDb.deleteById(id);
  }

  get(id: Project["id"]): Promise<Project> {
    return ProjectDb.find(id);
  }

  getAll(): Promise<Project[]> {
    return ProjectDb.all();
  }

  async update(
    id: Project["id"],
    mutation: Partial<Project>
  ): Promise<Project> {
    const project = await ProjectDb.find(id);
    return ProjectDb.update(id, {
      ...project,
      ...mutation
    });
  }

  async updateAll(entities: Project[]): Promise<void> {
    await Promise.all(entities.map(it => this.update(it.id, it)));
  }
}
