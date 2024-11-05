import hashlib

class UserVM:
    def __init__(self, name, password):
        self.name = name
        self.password = UserVM.hash_password(password)

    @staticmethod
    def hash_password(password):
        return hashlib.sha256(password.encode()).hexdigest()

    def check_password(self, password):
        return self.password == UserVM.hash_password(password)

