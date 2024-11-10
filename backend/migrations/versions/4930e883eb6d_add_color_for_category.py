"""add color for category

Revision ID: 4930e883eb6d
Revises: 981d1e025fa9
Create Date: 2024-11-09 12:16:39.935765

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '4930e883eb6d'
down_revision = '981d1e025fa9'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('categories', schema=None) as batch_op:
        batch_op.add_column(sa.Column('color', sa.String(length=10), nullable=False))
        batch_op.drop_column('description')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('categories', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', mysql.VARCHAR(length=200), nullable=True))
        batch_op.drop_column('color')

    # ### end Alembic commands ###
