"""empty message

Revision ID: 433faf514311
Revises: fa3b0cda0cf0
Create Date: 2023-10-07 03:38:52.051838

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '433faf514311'
down_revision = 'fa3b0cda0cf0'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('order',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('order_id', sa.String(length=200), nullable=False),
    sa.Column('status', sa.String(length=50), nullable=False),
    sa.Column('total_amount', sa.Float(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('order_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('order')
    # ### end Alembic commands ###
