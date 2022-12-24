# handle in error response
def error(message, code=1000):
    return {'result': 'error', 'code': code, 'message': message}


# handle in success response
def success(result_data=None, code=200):
    if result_data is None:
        result_data = {}
    return {'result': 'success', 'data': result_data, 'code': code}
