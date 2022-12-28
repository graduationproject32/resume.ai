from Backend.Helpers.databaseconnector import dbExecute


def check_userlogin(user_email, user_password):
    try:
        Login_data = {
            "user_email": user_email,
            "user_password": user_password,
        }
        userId = dbExecute(Login_data, "fetchone")
        if userId:
            return userId
        else:
            raise Exception("user not registered")
    except Exception as e:
        raise e


def signup_data(data):
    try:
        Login_data = {
            "user_email": data['user_email'],
        }
        userId = dbExecute(Login_data, "fetchone")
        if not userId:
            inserted_data = {
                "user_email": data['user_email'],
                "user_password": data['user_password'],
                "user_level": data['user_level'],
                "user_name": data['user_name'],
                "user_lastposition": data['user_lastposition']
            }
            userId = dbExecute(inserted_data, "insertone")
            return userId
        else:
            raise Exception("user already registered")
    except Exception as e:
        raise e
