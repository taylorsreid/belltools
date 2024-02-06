import { defineStore } from "pinia";
import { Flight, ApiResponse } from "../types";
import PocketBase from 'pocketbase';
import apiUrl from "./apiUrl";

const pb: PocketBase = new PocketBase(apiUrl);

export const useFlightsStore = defineStore('flights', {
    state: () => ({
        apiResponse: {} as ApiResponse,
        hideLanded: false,
        sortBy: 'eta'
    }),
    getters: {
        flights(): Flight[] { return this.apiResponse.flights },
        links(): object { return this.apiResponse.links },
        
        filteredSortedFlights(): Flight[] {

            // hacky solution to prevent "Cannot read properties of undefined (reading 'filter'" without using async/await
            if (Object.keys(this.apiResponse).length !== 0) {
                // filter
                const f = this.flights.filter((f:Flight) => {
                    if (this.hideLanded) {
                        return !f.actual_on
                    }
                    else {
                        return true
                    }
                })

                // sort
                switch (this.sortBy) {
                    case 'origin':
                        return f.sort((a, b) => {
                            a.origin.city ??= ''
                            b.origin.city ??= ''
                            return a.origin.city.localeCompare(b.origin.city) 
                        })
                    case 'flight':
                        return f.sort((a, b) => {
                            a.ident_iata ??= ''
                            b.ident_iata ??= ''
                            return a.ident_iata.localeCompare(b.ident_iata)
                        })
                    default: // ETA
                        return f.sort((a, b) => {
                            a.predicted_on ??= ''
                            b.predicted_on ??= ''
                            return new Date(a.predicted_on).getTime() - new Date(b.predicted_on).getTime()
                        })
                }
            }
            else {
                return []
            }
        },
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