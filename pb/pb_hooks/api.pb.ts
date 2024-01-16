"use strict";
/// <reference path="../pb_data/types.d.ts" />
routerAdd("GET", "/api/test", async (c) => {
    try {
        // const data = $http.send({
        //     url: `http://api.aviationstack.com/v1/flights?access_key=${process.env.AS_API_KEY}&arr_iata=HNL`,
        //     method: "GET"
        // })
        // return c.json(data.statusCode, data.json);
        return c.json(200, `${process.env.AS_API_KEY}`);
        
    }
    catch (error) {
        console.log(error);
    }
});
