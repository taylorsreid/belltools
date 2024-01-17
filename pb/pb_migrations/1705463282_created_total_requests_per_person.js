/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "odbbgtsvv6sphlo",
    "created": "2024-01-17 03:48:02.217Z",
    "updated": "2024-01-17 03:48:02.217Z",
    "name": "total_requests_per_person",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "83iie3xq",
        "name": "user",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "4y3rlka2",
        "name": "total",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT id as id, user as user, COUNT(id) as total FROM external_api_requests GROUP BY user;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("odbbgtsvv6sphlo");

  return dao.deleteCollection(collection);
})
