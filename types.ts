export interface Flight {
    aircraft: unknown,
    airline: { 
        iata: string,
        icao: string,
        name: string 
    }, 
    arrival: { 
        actual: string,
        actual_runway: unknown,
        airport: string,
        baggage: unknown,
        delay: unknown,
        estimated: string,
        estimated_runway: unknown,
        gate: unknown,
        iata: string,
        icao: string,
        scheduled: string,
        terminal: string,
        timezone: string
    },
    departure: {
        actual: string, 
        actual_runway: unknown, 
        airport: string
        delay: number,
        estimated: string,
        estimated_runway: unknown,
        gate: unknown,
        iata: string,
        icao: string,
        scheduled: string,
        terminal: unknown,
        timezone: string 
    },
    flight: {
        codeshared: unknown,
        iata: string,
        icao: string,
        number: number
    },
    flight_date: string,
    flight_status: string,
    live: unknown 
}

export interface Pagination {
    count: number,
    limit: number,
    offset: number,
    total: number
}

export interface ApiResponse {
    data: Array<Flight>
    pagination: Pagination
}