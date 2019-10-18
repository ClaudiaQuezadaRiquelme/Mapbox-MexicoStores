export interface Store {
    Name: string;
    Address: string;
    Coordinates: {
        lat: number;
        lng: number
    };
}
