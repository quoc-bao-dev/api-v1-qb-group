import { BaseDocument } from './model';

export interface BaseService<T extends BaseDocument> {
    create(data: Partial<T>): Promise<T>;
    getAll(): Promise<T[] | null>;
    getById?(id: string): Promise<T | null>;
    update(id: string, data: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
}
