export interface IModule<T> {
    getAll(): Promise<T[]>;
    getById(id: string): Promise<T>;
    create(data: any): Promise<T>;
    update(id: string, data: any): Promise<T>;
    delete(id: string): Promise<void>;
  }