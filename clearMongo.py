import pymongo

client = pymongo.MongoClient('localhost:27017')
db = client.atlas
stored_queries = db.queries  # type: pymongo.collection.Collection

# just clear that puppy out
everything = dict()
stored_queries.delete_many(everything)
