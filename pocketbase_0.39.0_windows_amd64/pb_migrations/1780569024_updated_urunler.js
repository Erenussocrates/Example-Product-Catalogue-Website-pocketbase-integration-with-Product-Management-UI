/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4177699307")

  // remove field
  collection.fields.removeById("text183966314")

  // remove field
  collection.fields.removeById("text4170839921")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4177699307")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text183966314",
    "max": 0,
    "min": 0,
    "name": "urun_kodu",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text4170839921",
    "max": 0,
    "min": 0,
    "name": "asd",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
})
