/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bfjug4wti6sux8i")

  collection.options = {
    "query": "SELECT id as id, user as user, COUNT(id) as total FROM external_api_requests WHERE created >= date('now','-31 days') GROUP BY user;"
  }

  // remove
  collection.schema.removeField("6zatonjk")

  // remove
  collection.schema.removeField("50pd1jac")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2qiwafxt",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2kv3ekit",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bfjug4wti6sux8i")

  collection.options = {
    "query": "SELECT id as id, user as user, COUNT(id) as total FROM external_api_requests WHERE created >= date('now','-7 days') GROUP BY user;"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6zatonjk",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "50pd1jac",
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
  }))

  // remove
  collection.schema.removeField("2qiwafxt")

  // remove
  collection.schema.removeField("2kv3ekit")

  return dao.saveCollection(collection)
})
