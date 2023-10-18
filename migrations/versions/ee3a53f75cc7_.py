"""empty message

Revision ID: ee3a53f75cc7
Revises: 92c6661b2e69
Create Date: 2023-10-17 16:26:50.301476

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ee3a53f75cc7'
down_revision = '92c6661b2e69'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('booking', schema=None) as batch_op:
        batch_op.add_column(sa.Column('status', sa.Enum('pending', 'approved', 'archived', 'canceled', 'done', 'pto', name='status'), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('booking', schema=None) as batch_op:
        batch_op.drop_column('status')

    # ### end Alembic commands ###
