import type { Entity } from "../model/entity.ts";
import { AbstractCrudService } from "./crud-service.ts";

export class MemoryCrudService<E extends Entity>
  extends AbstractCrudService<E> {
  private entities: E[] = [];

  constructor(protected name: string, entities: E[] = []) {
    super();
    this.entities = entities;
  }

  async getAll(): Promise<E[]> {
    return this.entities;
  }

  async updateAll(entities: E[]): Promise<void> {
    this.entities = entities;
  }
}
