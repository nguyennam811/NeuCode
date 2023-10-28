from ..database import Base
from sqlalchemy import Enum, Text, Column, ForeignKey, Integer, String, ForeignKey, JSON, Float
from sqlalchemy.orm import relationship
import uuid
import enum
from .base import TimeModel
class Difficulty(enum.Enum):
    EASY = "Dễ"
    MEDIUM = "Trung bình"
    DIFFICULT = "Khó"
    def to_json(self):
        return self.value
class Problem(Base, TimeModel):
    __tablename__ = 'problems'

    id = Column(String, primary_key=True, index=True, nullable=False)
    user_id = Column(String, ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    title = Column(String, nullable=False)
    difficulty = Column(Enum(Difficulty), default=Difficulty.EASY)
    problem_type = Column(String, nullable=False)
    points = Column(Float, nullable=False, default=0)
    instructions = Column(Text, nullable=True)
    description = Column(Text, nullable=True)
    max_memory_limit = Column(Float, nullable=False, default=0)
    max_execution_time = Column(Float, nullable=False, default=0)

    user = relationship("User", back_populates="problems")
    submissions = relationship("Submission", back_populates="problems")
    tests = relationship("Test", back_populates="problems")
    assignment = relationship("Assignment", back_populates="problems")

# {
#   "id": "sum",
#   "user_id": "1",
#   "title": "Tổng 2 số",
#   "difficulty": "Dễ",
#   "problem_type": "đơn giản",
#   "description": "",
#   "max_memory_limit": 256,
#   "max_execution_time": 1
# }


# {
#   "id": "hieu",
#   "user_id": "2",
#   "title": "Bài toán: Hiệu Hai Số",
#   "difficulty": "Dễ",
#   "problem_type": "toán tử",
#   "description": "<p><strong class=\"ql-size-large\">Mô tả:</strong></p><p><span class=\"ql-size-large\">Viết một chương trình để tính hiệu của hai số nguyên. Bạn cần nhận hai số nguyên đầu vào và trả về hiệu của chúng.</span></p><p><br></p><h2>Yêu cầu:</h2><ol><li><span style=\"color: rgb(55, 65, 81); background-color: rgb(204, 224, 245);\">Chương trình nhận vào hai số nguyên, </span><code style=\"color: var(--tw-prose-code); background-color: rgb(204, 224, 245);\">a</code><span style=\"color: rgb(55, 65, 81); background-color: rgb(204, 224, 245);\"> và </span><code style=\"color: var(--tw-prose-code); background-color: rgb(204, 224, 245);\">b</code><span style=\"color: rgb(55, 65, 81); background-color: rgb(204, 224, 245);\"> (|a|, |b| &lt;= 10^9).</span></li><li><span style=\"color: rgb(55, 65, 81); background-color: rgb(247, 247, 248);\">Chương trình trả về một số nguyên duy nhất, là hiệu của </span><code style=\"color: var(--tw-prose-code); background-color: rgb(247, 247, 248);\">a</code><span style=\"color: rgb(55, 65, 81); background-color: rgb(247, 247, 248);\"> và </span><code style=\"color: var(--tw-prose-code); background-color: rgb(247, 247, 248);\">b</code><span style=\"color: rgb(55, 65, 81); background-color: rgb(247, 247, 248);\">.</span></li></ol><p><br></p><h3>Ví dụ 1:</h3><pre class=\"ql-syntax\" spellcheck=\"false\">Input: \na = 5\nb = 3\n\nOutput:\n2\n</pre><p><br></p><h3>Ví dụ 2:</h3><pre class=\"ql-syntax\" spellcheck=\"false\">Input:\na = 20\nb = 10\n\nOutput:\n10\n</pre><p><br></p><h2>Giới hạn:</h2><ul><li><span class=\"ql-size-large\">|a|, |b| &lt;= 10</span><sup class=\"ql-size-large\">9</sup></li></ul><p><br></p><h2>Ghi chú:</h2><ul><li><span class=\"ql-size-large\">Nếu a là số nguyên đầu tiên và b là số nguyên thứ hai, thì hiệu a-b là số nguyên đầu ra</span></li><li><span class=\"ql-size-large\">đảm bảo kiểm tra cả trường hợp số nguyên âm và dương</span></li><li><span class=\"ql-size-large\">chắc chắn chương trình hoạt động cho mọi giá trị của a và b trong phạm vi giới hạn</span></li></ul><p><br></p><p><br></p>",
#   "max_memory_limit": 1,
#   "max_execution_time": 5
# }
