export interface Flight {
    "ident": string
    "ident_icao": string | null
    "ident_iata": string | null
    "fa_flight_id": string
    "actual_off": string | null // date ex: "2024-01-18T15:20:05Z"
    "actual_on": string | null // date ex: "2024-01-18T15:20:05Z"
    "foresight_predictions_available": boolean
    "predicted_out": string | null // date ex: "2024-01-18T15:20:05Z"
    "predicted_off": string | null // date ex: "2024-01-18T15:20:05Z"
    "predicted_on": string | null // date ex: "2024-01-18T15:20:05Z"
    "predicted_in": string | null // date ex: "2024-01-18T15:20:05Z"
    "predicted_out_source": string | null // date ex: "2024-01-18T15:20:05Z"
    "predicted_off_source": string | null // date ex: "2024-01-18T15:20:05Z"
    "predicted_on_source": string | null // date ex: "2024-01-18T15:20:05Z"
    "predicted_in_source": string | null // date ex: "2024-01-18T15:20:05Z"
    "origin": {
        "code": string | null
        "code_icao": string | null
        "code_iata": string | null
        "code_lid": string | null
        "timezone": string | null // timezone
        "name": string | null
        "city": string | null
        "airport_info_url": string | null // partial url ex: "/airports/KSJC"
    }
    "destination": {
        "code": string | null // "PHNL"
        "code_icao": string | null // "PHNL"
        "code_iata": string | null // "HNL"
        "code_lid": string | null // "HNL"
        "timezone": string | null // timezone ex: "Pacific/Honolulu"
        "name": string | null // ex: "Daniel K Inouye Intl"
        "city": string | null
        "airport_info_url": string | null // partial url ex: "/airports/PHNL"
    }
    "waypoints": number[]
    "first_position_time": string | null // date ex: "2024-01-18T15:20:05Z"
    "last_position": {
        "fa_flight_id": string | null
        "altitude": number
        "altitude_change": string // ex: "D" for descent "A" for ascent "C" for constant
        "groundspeed": number
        "heading": number | null
        "latitude": number
        "longitude": number
        "timestamp": string // date ex: "2024-01-18T15:20:05Z"
        "update_type": string | null
    }
    "bounding_box": number[]
    "ident_prefix": string | null
    "aircraft_type": string | null
}

export interface ApiResponse {
    links: {
        next: string
    },
    num_pages: number,
    flights: Flight[]
}