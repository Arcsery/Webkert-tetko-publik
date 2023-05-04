export interface User{
    userId: string,
    name: string,
    email: string,
    phoneNumber: string,
    role: string,
    tattoos_booked?:string[],
    imageUrl?: string
}