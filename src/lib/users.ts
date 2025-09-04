export interface Geo {
    lat: string;
    lng: string;
}

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

export interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

export async function fetchUsers(): Promise<User[]> {
    const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch users: ${res.status}`);
    }
    const data = (await res.json()) as User[];
    return data;
}

export async function fetchUser(id: number): Promise<User> {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error(`Failed to fetch user ${id}: ${res.status}`);
    }
    return (await res.json()) as User;
}
