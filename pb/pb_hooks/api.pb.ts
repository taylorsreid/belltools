"use strict";
/// <reference path="../pb_data/types.d.ts" />
/// <reference path="./types.ts" />

routerAdd("GET", "/api/flights", (c) => {

    let data = {};

    if (!$app.isDev()) {

        // @ts-ignore
        data = $http.send({
            url: `http://api.aviationstack.com/v1/flights?access_key=${process.env.AS_API_KEY}&arr_iata=HNL`,
            method: "GET"
        })
        
        $app.dao().saveRecord(new Record($app.dao().findCollectionByNameOrId("external_api_requests"), {
            user: $app.dao().findAuthRecordByToken($apis.requestInfo(c).headers.authorization.substring(7), $app.settings().recordAuthToken.secret).getId()
        }))
    }
    else {
        // @ts-ignore
        data.statusCode = 203
        // @ts-ignore
        data.json = $http.send({
            url: 'http://localhost:8090/testData.json',
            method: 'GET'
        }).json
    }

    // @ts-ignore
    return c.json(data.statusCode, data.json)
       
} , $apis.requireRecordAuth());

if ($app.isDev()) {
    routerAdd("GET", "/api/mirror", (c) => {
        return c.json(200, $apis.requestInfo(c))
    }, $apis.requireRecordAuth());
}
