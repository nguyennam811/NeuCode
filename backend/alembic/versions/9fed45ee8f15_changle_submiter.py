"""changle submiter

Revision ID: 9fed45ee8f15
Revises: a7bfbcaaf61e
Create Date: 2023-11-07 11:11:22.319497

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9fed45ee8f15'
down_revision = 'a7bfbcaaf61e'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('submission', sa.Column('submiter_id', sa.String(), nullable=False))
    op.drop_constraint('submission_user_id_fkey', 'submission', type_='foreignkey')
    op.create_foreign_key(None, 'submission', 'users', ['submiter_id'], ['id'], ondelete='CASCADE')
    op.drop_column('submission', 'user_id')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('submission', sa.Column('user_id', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'submission', type_='foreignkey')
    op.create_foreign_key('submission_user_id_fkey', 'submission', 'users', ['user_id'], ['id'], ondelete='CASCADE')
    op.drop_column('submission', 'submiter_id')
    # ### end Alembic commands ###
