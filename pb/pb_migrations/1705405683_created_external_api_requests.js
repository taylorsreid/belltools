/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ltue1o2m8so5sdo",
    "created": "2024-01-16 11:48:03.512Z",
    "updated": "2024-01-16 11:48:03.512Z",
    "name": "external_api_requests",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "bbhdfl1l",
        "name": "timestamp",
        "type": "date",
        "required": true,
        "presentable": true,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "unc3o7kt",
        "name": "user",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ltue1o2m8so5sdo");

  return dao.deleteCollection(collection);
})
