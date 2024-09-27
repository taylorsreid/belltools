"use strict";
/// <reference path="../pb_data/types.d.ts" />
/// <reference path="./types.ts" />

routerAdd("GET", "/api/flights", (c) => {

    let data = {};

    if ($apis.requestInfo(c).authRecord?.email() === 'demouser@example.com') {
        // @ts-ignore
        data.statusCode = 203
        // @ts-ignore
        data.json = $http.send({
            url: 'http://localhost:8090/flightAwareTestData.json',
            method: 'GET'
        }).json
    }
    else {
        data = $http.send({
            url: `https://aeroapi.flightaware.com/aeroapi/flights/search/advanced?query={in dest {PHNL}} {airline 1} {false cancelled} {in status {A Z}}&max_pages=10`,
            method: "GET",
            headers: {
                Accept: `application/json; charset=UTF-8`,
                // @ts-ignore
                'x-apikey': process.env.FA_API_KEY
            }
        })
        
        $app.dao().saveRecord(new Record($app.dao().findCollectionByNameOrId("external_api_requests"), {
            user: $app.dao().findAuthRecordByToken($apis.requestInfo(c).headers.authorization.substring(7), $app.settings().recordAuthToken.secret).getId()
        }))
    }

    // @ts-ignore
    return c.json(data.statusCode, data.json)
       
} , $apis.requireRecordAuth());

if ($app.isDev()) {
    routerAdd("GET", "/api/mirror", (c) => {
        return c.json(200, $apis.requestInfo(c))
    }, $apis.requireRecordAuth());
}
