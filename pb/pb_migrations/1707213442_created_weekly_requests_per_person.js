/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "9rcg3cfvjndcipe",
    "created": "2024-02-06 09:57:22.024Z",
    "updated": "2024-02-06 09:57:22.024Z",
    "name": "weekly_requests_per_person",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rwvotzxb",
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
        "id": "eyyeqck8",
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
      "query": "SELECT id as id, user as user, COUNT(id) as total FROM external_api_requests WHERE created >= date('now','-7 days') GROUP BY user;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("9rcg3cfvjndcipe");

  return dao.deleteCollection(collection);
})
