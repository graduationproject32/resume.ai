import pymongo as pymongo


def dbExecute(sql, exType=""):
    try:
        client = pymongo.MongoClient(
            "mongodb+srv://project_32:project_32@cluster0.gia8ihc.mongodb.net/?retryWrites=true&w"
            "=majority")
        # db = client.test
        mydb = client["Project_32"]
        mycol = mydb["Results"]
        if exType == 'fetchone':
            x = mycol.find_one(sql)
            return x
        elif exType == 'fetchall':
            row_as_dict = [dict(row) for row in mycol.find(sql)]
            return row_as_dict
        elif exType == 'insertone':
            x = mycol.insert_one(sql)
            return x.inserted_id
        elif exType == 'insertmany':
            x = mycol.insert_many(sql)
            return x.inserted_ids
    except Exception as err:
        raise err


# print(dbExecute({"_id": 2}, 'fetchone'))
