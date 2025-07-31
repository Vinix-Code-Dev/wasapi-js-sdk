export interface IModule {
    getAll(): Promise<any>;
    getById(id: string): Promise<any>;
    create(data: any): Promise<any>;
    update(data: any): Promise<any>;
    delete(id: string): Promise<any>;
  }