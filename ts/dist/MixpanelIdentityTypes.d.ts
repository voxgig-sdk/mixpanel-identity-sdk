export interface Identity {
    code?: number;
    num_records_imported?: number;
    status?: string;
}
export interface IdentityCreateData {
    project_id?: string;
    strict: string;
    code?: number;
    num_records_imported?: number;
    status?: string;
}
