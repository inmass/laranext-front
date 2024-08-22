export interface ProductType {
    id: number;
    imageUrl: string;
    name: string;
    status: 'active' | 'draft' | 'archived';
    price: number;
    stock: number;
    availableAt: Date;
}