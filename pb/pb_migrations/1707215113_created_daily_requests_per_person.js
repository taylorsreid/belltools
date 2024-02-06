/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "66adq4f2griyxkd",
    "created": "2024-02-06 10:25:13.655Z",
    "updated": "2024-02-06 10:25:13.655Z",
    "name": "daily_requests_per_person",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "zafe9kbz",
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
        "id": "cuvih6qx",
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
    "listRule": "",
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT id as id, user as user, COUNT(id) as total FROM external_api_requests WHERE created >= date('now','-24 hours') GROUP BY user;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("66adq4f2griyxkd");

  return dao.deleteCollection(collection);
})
