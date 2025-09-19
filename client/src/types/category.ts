export type Category = {
    id: string;
    title: string;
    metaTitle?: string;
    description: string;
    metaDescription?: string;
    photo: string;
    sortOrder: number;
}

export type CreateCategory = Omit<Category, "id">