declare module 'lokijs' {
    export default class Loki {
        constructor(filename: string, options?: any);
        addCollection<T>(name: string, options?: any): Collection<T>;
        getCollection<T>(name: string): Collection<T> | null;
        loadDatabase(options: any, callback: (err: any) => void): void;
        saveDatabase(callback: (err: any) => void): void;
    }

    export class Collection<T> {
        insert(doc: T): T;
        find(query?: any): T[];
        findOne(query: any): T | null;
        update(doc: T): void;
        remove(doc: T): void;
    }
}