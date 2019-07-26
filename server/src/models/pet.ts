
export interface Pet {
    id: string;
    name: string;
    birth_day: Date;
}
export async function getAllPets(): Promise<Pet[]> {
    return [];
}
