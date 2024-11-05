class TaskVM:
    def __init__(self , title, description, status, created_at, updated_at, id_user, id_category, id = None):
        self.id = id
        self.title = title
        self.description = description
        self.status = status
        self.created_at = created_at
        self.updated_at = updated_at
        self.id_user = id_user
        self.id_category = id_category

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "status": self.status,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "id_user": self.id_user,
            "id_category": self.id_category
        }