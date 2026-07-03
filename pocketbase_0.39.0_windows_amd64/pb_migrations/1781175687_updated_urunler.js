/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4177699307")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.collectionName = \"calisanlar\"",
    "deleteRule": "@request.auth.collectionName = \"calisanlar\"",
    "updateRule": "@request.auth.collectionName = \"calisanlar\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4177699307")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "updateRule": null
  }, collection)

  return app.save(collection)
})
