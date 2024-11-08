import hashlib

class UserVM:
    def __init__(self, email, username, password):
        self.email = email
        self.username = username
        self.password = UserVM.hash_password(password)

    @staticmethod
    def hash_password(password):
        return hashlib.sha256(password.encode()).hexdigest()

    def check_password(self, password):
        return self.password == UserVM.hash_password(password)

class LoginRequest:
    def __init__(self, email, password):
        self.email =  email
        self.password = password