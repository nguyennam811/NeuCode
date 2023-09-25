"""news version

Revision ID: 17852d986c5f
Revises: 
Create Date: 2023-09-26 00:07:40.476902

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '17852d986c5f'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('exercises',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('title', sa.String(), nullable=False),
    sa.Column('difficulty', sa.Enum('EASY', 'MEDIUM', 'DIFFICULT', name='difficulty'), nullable=True),
    sa.Column('exercise_type', sa.String(), nullable=False),
    sa.Column('points', sa.Float(), nullable=False),
    sa.Column('instructions', sa.Text(), nullable=True),
    sa.Column('created', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated', sa.DateTime(timezone=True), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_exercises_id'), 'exercises', ['id'], unique=False)
    op.create_table('users',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('fullname', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('role', sa.Enum('STUDENT', 'TEACHER', 'ADMIN', name='role'), nullable=True),
    sa.Column('created', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated', sa.DateTime(timezone=True), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('password')
    )
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)
    op.create_table('submission',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('exercise_id', sa.String(), nullable=False),
    sa.Column('language', sa.String(), nullable=False),
    sa.Column('code', sa.Text(), nullable=False),
    sa.Column('score', sa.Float(), nullable=True),
    sa.Column('status', sa.String(), nullable=True),
    sa.Column('created', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=True),
    sa.Column('updated', sa.DateTime(timezone=True), nullable=True),
    sa.ForeignKeyConstraint(['exercise_id'], ['exercises.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_submission_id'), 'submission', ['id'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_submission_id'), table_name='submission')
    op.drop_table('submission')
    op.drop_index(op.f('ix_users_id'), table_name='users')
    op.drop_table('users')
    op.drop_index(op.f('ix_exercises_id'), table_name='exercises')
    op.drop_table('exercises')
    # ### end Alembic commands ###
