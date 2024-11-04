class TaskVM:
    def __init__(self, title, description, status, created_at, updated_at, id_user, id_category):
        self.title = title
        self.description = description
        self.status = status
        self.created_at = created_at
        self.updated_at = updated_at
        self.id_user = id_user
        self.id_category = id_category
