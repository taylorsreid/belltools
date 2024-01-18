import { defineStore } from "pinia";
import { Flight, ApiResponse, Pagination } from "../types";
import PocketBase from 'pocketbase';
import apiUrl from "./apiUrl";

const pb: PocketBase = new PocketBase(apiUrl);

export const useFlightsStore = defineStore('flights', {
    state: () => ({
        apiResponse: {} as ApiResponse,
        hideScheduled: true,
        hideLanded: true,
        hideCancelled: true,
        sortBy: 'eta'
    }),
    getters: {
        flights(): Flight[] { return this.apiResponse.data },
        pagination(): Pagination { return this.apiResponse.pagination },

        // // disabled for now due to large paginated responses
        // filteredFlights(): Flight[] {
        //     const prop = this.flights
        //     return prop.filter((f:Flight) => {
        //         if (this.hideScheduled && this.hideLanded && this.hideCancelled) {
        //             return !(f.flight_status === 'scheduled' || f.flight_status === 'landed' || f.flight_status === 'cancelled')
        //         }
        //         if (this.hideScheduled && this.hideCancelled) {
        //             return !(f.flight_status === 'scheduled' || f.flight_status === 'cancelled')
        //         }
        //         if (this.hideLanded && this.hideCancelled) {
        //             return !(f.flight_status === 'landed' || f.flight_status === 'cancelled')
        //         }
        //         if (this.hideScheduled && this.hideLanded) {
        //             return !(f.flight_status === 'scheduled' || f.flight_status === 'landed')
        //         }
        //         if (this.hideScheduled) {
        //             return !(f.flight_status === 'scheduled')
        //         }
        //         if (this.hideLanded) {
        //             return !(f.flight_status === 'landed')
        //         }
        //         if (this.hideCancelled) {
        //             return !(f.flight_status === 'cancelled')
        //         }
        //         else {
        //             return true
        //         }
        //     })
        // },
        
        sortedFlights(): Flight[] {
            const f = this.flights
            switch (this.sortBy) {
                case 'origin':
                    return f.sort((a, b) => { return a.departure.airport.localeCompare(b.departure.airport) })
                case 'airline':
                    return f.sort((a, b) => { return a.airline.name.localeCompare(b.airline.name) })
                default: // ETA
                    return f.sort((a, b) => { return new Date(a.arrival.estimated).getTime() - new Date(b.arrival.estimated).getTime() })
            }
        },

        // // disabled for now due to large paginated responses
        // filteredSortedFlights(): Flight[] {
        //     const filtered = this.filteredFlights
        //     switch (this.sortBy) {
        //         case 'origin':
        //             return filtered.sort((a, b) => { return a.departure.airport.localeCompare(b.departure.airport) })
        //         case 'airline':
        //             return filtered.sort((a, b) => { return a.airline.name.localeCompare(b.airline.name) })
        //         default: // ETA
        //             return filtered.sort((a, b) => { return new Date(a.arrival.estimated).getTime() - new Date(b.arrival.estimated).getTime() })
        //     }
        // }
    },
    actions: {
        async callApi(): Promise<void> {
            fetch(pb.buildUrl('api/flights'), {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + pb.authStore.token
                }
            })
            .then((r) => r.json() as Promise<ApiResponse>)
            .then((ar) => {
                this.apiResponse = ar
            })
        }
    },
    persist: true,
})