import json
import os
from bson import json_util
from flask import request, send_file
from flask_restful import Resource
from werkzeug.utils import secure_filename
from Backend.Helpers import response
from Backend.backblazeconnection.backblazeconnector import uploadpdf_On_backblaze
from Backend.model.userInfo_model import signup_data, check_userlogin


class Default(Resource):
    def get(self):
        try:
            return response.success({'message': 'Welcome From Backend'})
        except Exception as e:
            return response.error(e.__str__())


class Login(Resource):
    def post(self):
        try:
            userdata = request.get_json()
            if not userdata:
                return response.error('No userdata entered')
            elif userdata:
                if 'user_email' not in userdata or userdata['user_email'].isnumeric() == 'false':
                    raise ValueError('user_email required')
                if 'user_password' not in userdata:
                    raise ValueError('user_password required')
                logindata = check_userlogin(userdata['user_email'], userdata['user_password'])
                logindata = json.dumps(logindata, indent=4, default=json_util.default)
                return response.success({'message': 'User Login Successfully',
                                         'data': logindata})
        except (Exception, ValueError) as e:
            return response.error(e.__str__())


# Signup
class Signup(Resource):
    def post(self):
        try:
            userdata = request.get_json()
            if not userdata:
                return response.error('No userdata entered')
            elif userdata:
                if 'user_email' not in userdata or userdata['user_email'].isnumeric() == 'false':
                    raise ValueError('user_email required')
                if 'user_password' not in userdata:
                    raise ValueError('user_password required')
                if 'user_level' not in userdata:
                    raise ValueError('user_level required')
                signupdata = signup_data(userdata['user_email'], userdata['user_password'], userdata['user_level'])
                signupdata = json.dumps(signupdata, indent=4, default=json_util.default)
                return response.success({'message': 'User Signup Successfully',
                                         'data': signupdata})
                # return send_file(filename)
            # print(generate_kv(filename))
        except (Exception, ValueError) as e:
            return response.error(e.__str__())


class Upload(Resource):
    def post(self):
        try:
            if 'file' not in request.files:
                return response.error('No file part')
            file = request.files['file']
            if file.filename == '':
                return response.error('No selected file')
            if file:
                filename = secure_filename(file.filename)
                # file.save(os.path.join(filename))
                uploadpdf_On_backblaze(filename, file)
                return response.success({'message': 'Resume Uploaded Successfully'})
                # return send_file(filename)
            # print(generate_kv(filename))
        except (Exception, ValueError) as e:
            return response.error(e.__str__())
