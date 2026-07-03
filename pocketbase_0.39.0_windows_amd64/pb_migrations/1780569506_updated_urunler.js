/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4177699307")

  // add field
  collection.fields.addAt(3, new Field({
    "help": "",
    "hidden": false,
    "id": "file2973724683",
    "maxSelect": 10,
    "maxSize": 0,
    "mimeTypes": null,
    "name": "urun_resim",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": null,
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4177699307")

  // remove field
  collection.fields.removeById("file2973724683")

  return app.save(collection)
})
