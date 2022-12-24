from flask_restful import Api

from Backend.API.UserInfo import Default, Upload,Login,Signup

api = Api()
api.add_resource(Default, '/', '/resumeanalysis')
api.add_resource(Upload, '/resumeanalysis/UploadResume')
api.add_resource(Login,'/resumeanalysis/login')
api.add_resource(Signup, '/resumeanalysis/signup')
