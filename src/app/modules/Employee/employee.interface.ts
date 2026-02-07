export interface IEmployee {
    id?: string;
    name: string;
    age: number;
    designation: string;
    hiring_date: Date;
    date_of_birth: Date;
    salary: number;
    photo_path?: string;
    created_at?: Date;
    updated_at?: Date;
}