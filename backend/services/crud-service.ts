import type { Entity } from '../model/entity.ts';

export interface CrudService<E extends Entity> {
  getAll(): Promise<E[]>;
  get(id: E['id']): Promise<E>;
  create(id: E): Promise<E>;
  update(id: E['id'], mutation: Partial<E>): Promise<E>;
  updateAll(entities: E[]): Promise<void>;
  delete(id: E['id']): Promise<void>;
}

export abstract class AbstractCrudService<E extends Entity> implements CrudService<E> {
  protected abstract name: string;
  abstract getAll(): Promise<E[]>;
  abstract updateAll(entities: E[]): Promise<void>;

  async get(id: E['id']): Promise<E> {
    const entity = (await this.getAll()).find((it) => it.id === id);
    if (entity === undefined) throw new EntityNotFoundException(this.name, id);
    return entity;
  }

  async create(entity: E): Promise<E> {
    await this.updateAll([...(await this.getAll()), entity]);
    return entity;
  }

  async update(id: E['id'], mutation: Partial<E>): Promise<E> {
    const oldEntities = await this.getAll();
    const entityToUpdate = oldEntities.find((it) => it.id === id);
    if (entityToUpdate === undefined) throw new EntityNotFoundException(this.name, id);
    const updatedEntity = { ...entityToUpdate, ...mutation };
    await this.updateAll(oldEntities.map((todo) => (todo.id === id ? updatedEntity : todo)));
    return updatedEntity;
  }

  async delete(id: E['id']): Promise<void> {
    const oldEntities = await this.getAll();
    const entityToDelete = oldEntities.find((it) => it.id === id);
    if (entityToDelete === undefined) throw new EntityNotFoundException(this.name, id);
    await this.updateAll(oldEntities.filter((it) => it.id !== id));
  }
}

export class EntityNotFoundException extends Error {
  constructor(name: string, id: Entity['id'] | null) {
    super(`${name} with id: ${id} not found.`);
  }
}
