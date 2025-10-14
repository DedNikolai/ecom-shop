export type Category = {
    id: string;
    title: string;
    metaTitle?: string;
    description: string;
    metaDescription?: string;
    photo: string;
    sortOrder: number;
    url?: string;
}

export type CreateCategory = Omit<Category, "id">;
export type UpdateCategory = Omit<Category, "id">