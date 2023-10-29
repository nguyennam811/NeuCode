from sqlalchemy.orm import Session
from .. import models, schemas
from fastapi import HTTPException, status
import os
import secrets
from .run_test_code import run_file_code

async def run_code_testcase( test_case_data: schemas.TestCase, db: Session):
    random = secrets.token_hex(3)
    test = db.query(models.Test).filter(models.Test.problem_id == test_case_data.problem_id).all()
    if not test:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="test not found")

    problem = db.query(models.Problem).filter(models.Problem.id == test_case_data.problem_id).first()
    if not problem:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="problem not found")

    file_path = f"./temp/{random}.{test_case_data.language}"
    with open(file_path, "w", encoding="utf-8") as program_file:
        program_file.write(test_case_data.code)


    test_results = []
    for test_case in test:
        result = await run_file_code(db, file_path, test_case, test_case_data.language, problem.max_execution_time, problem.max_memory_limit)

        print(f"kết quả: {result} ")
        test_results.append(result)
        # await asyncio.sleep(3)

    try:
        os.remove(file_path)
        print(f"dã xóa file")
    except OSError as e:
        print(f"Lỗi xóa tệp tin: {e}")

    return test_results

#
# async def run_file_code(db: Session, file_path: str, test_case: models.Test, language: str):
#     # submission = db.query(models.Submission).filter(models.Submission.id == submission_id).first()
#     # if not submission:
#     #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="submission not found")
#
#     memory_usage = 0
#     elapsed_time = 0
#
#     try:
#         if language == "php":
#             run_command = f"php {file_path}"
#             start_time = time.time()  # Đo thời gian bắt đầu thực thi
#             process = psutil.Popen(run_command, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
#                                    stderr=subprocess.STDOUT, text=True)
#             end_time = time.time()  # Đo thời gian kết thúc thực thi
#
#             if process.is_running():
#                 memory_usage = process.memory_info().rss / (1024 * 1024)  # Đo lượng bộ nhớ sử dụng (MB)
#             else:
#                 memory_usage = None
#
#             output, _ = process.communicate(input=test_case.input)
#
#             elapsed_time = end_time - start_time
#             print(f"Thời gian thực thi: {elapsed_time} giây")
#             print(f"Bộ nhớ sử dụng: {memory_usage} MB")
#
#
#         elif language == "py":
#
#             run_command = f"python {file_path}"
#             start_time = time.time()
#             process = psutil.Popen(run_command, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
#                                    stderr=subprocess.STDOUT, text=True)
#             # end_time = time.time()
#             #
#             # if process.is_running():
#             #     memory_usage = process.memory_info().rss / (1024 * 1024)
#             # else:
#             #     memory_usage = None
#             #
#             # output, _ = process.communicate(input=test_case.input)
#             #
#             # elapsed_time = end_time - start_time
#             # print(f"Thời gian thực thi: {elapsed_time} giây")
#             # print(f"Bộ nhớ sử dụng: {memory_usage} MB")
#             timeout_seconds = 5
#             if process.is_running():
#                 memory_usage = process.memory_info().rss / (1024 * 1024)  # Chuyển đổi thành MB
#             else:
#                 memory_usage = None
#
#             try:
#                 # Sử dụng process.communicate để đọc output và đợi quá trình hoàn thành
#                 output, _ = process.communicate(input=test_case.input, timeout=timeout_seconds)
#
#             except subprocess.TimeoutExpired:
#                 # Nếu quá thời gian, ta sẽ kết thúc quá trình
#                 process.terminate()
#                 output = "Quá thời gian"
#
#             end_time = time.time()
#             elapsed_time = end_time - start_time
#
#             print(f"Thời gian thực thi: {elapsed_time} giây")
#             print(f"Bộ nhớ sử dụng: {memory_usage} MB")
#
#         elif language == "js":
#             run_command = f"node {file_path}"
#             start_time = time.time()
#             process = psutil.Popen(run_command, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
#                                    stderr=subprocess.STDOUT, text=True)
#             end_time = time.time()
#
#             if process.is_running():
#                 memory_usage = process.memory_info().rss / (1024 * 1024)
#             else:
#                 memory_usage = None
#
#             output, _ = process.communicate(input=test_case.input)
#
#             elapsed_time = end_time - start_time
#             print(f"Thời gian thực thi: {elapsed_time} giây")
#             print(f"Bộ nhớ sử dụng: {memory_usage} MB")
#
#         elif language == "cpp":
#             random = secrets.token_hex(3)
#             current_datetime = datetime.datetime.now()
#             formatted_datetime = current_datetime.strftime("%H_%M_%S-%d_%m_%Y")
#             output_exe = f"./temp/{formatted_datetime}-{random}.exe"
#             compile_command = f"g++ {file_path} -o {output_exe}"
#             compile_result = subprocess.run(compile_command, shell=True, stdout=subprocess.PIPE,
#                                             stderr=subprocess.PIPE, text=True, input=test_case.input)
#
#             if compile_result.returncode == 0:
#                 exe_path = os.path.abspath(output_exe)
#                 run_command = f"{exe_path}"
#                 start_time = time.time()
#                 process = psutil.Popen(run_command, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
#                                        stderr=subprocess.STDOUT, text=True)
#                 # end_time = time.time()
#                 #
#                 # # Đo lượng bộ nhớ sử dụng bằng psutil (nếu quy trình còn tồn tại)
#                 # if process.is_running():
#                 #     memory_usage = process.memory_info().rss / (1024 * 1024)  # Chuyển đổi thành MB
#                 # else:
#                 #     memory_usage = None
#                 #
#                 # output, _ = process.communicate(input=test_case.input)
#                 #
#                 # elapsed_time = end_time - start_time
#                 # print(f"Thời gian thực thi: {elapsed_time} giây")
#                 # print(f"Bộ nhớ sử dụng: {memory_usage} MB")
#                 #
#                 # os.remove(output_exe)
#                 timeout_seconds = 5
#                 if process.is_running():
#                     memory_usage = process.memory_info().rss / (1024 * 1024)  # Chuyển đổi thành MB
#                 else:
#                     memory_usage = None
#
#                 try:
#                     # Sử dụng process.communicate để đọc output và đợi quá trình hoàn thành
#                     output, _ = process.communicate(input=test_case.input, timeout=timeout_seconds)
#
#
#                 except subprocess.TimeoutExpired:
#                     # Nếu quá thời gian, ta sẽ kết thúc quá trình
#                     process.terminate()
#                     output = "Quá thời gian"
#
#
#                 end_time = time.time()
#                 elapsed_time = end_time - start_time
#
#                 print(f"Thời gian thực thi: {elapsed_time} giây")
#                 print(f"Bộ nhớ sử dụng: {memory_usage} MB")
#                 print(output)
#
#                 try:
#                     os.remove(output_exe)
#                 except OSError as e:
#                     print(f"Không thể xóa tệp tin: {e}")
#
#             else:
#                 # Xử lý lỗi biên dịch
#                 output = "SyntaxError: " + compile_result.stderr
#
#         else:
#             raise HTTPException(status_code=400, detail="Ngôn ngữ không được hỗ trợ")
#
#     except subprocess.CalledProcessError as e:
#         output = "Runtime Error: " + e.output
#
#     # test_result = models.Test_Result(
#     #     id=str(uuid.uuid4()),
#     #     submission_id=submission_id,
#     #     test_id=test_case.id,
#     #     output=output,
#     #     time=elapsed_time,
#     #     memory=memory_usage,
#     #     status_data=status_data_test(db, output, elapsed_time, memory_usage, test_case)
#     # )
#     # test_result_hihi = {
#     #     "id": str(uuid.uuid4()),
#     #     "submission_id": submission_id,
#     #     "test_id": test_case.id,
#     #     "output": output,
#     #     "time": elapsed_time,
#     #     "memory": memory_usage,
#     #     "status_data": status_data_test(db, output, elapsed_time, memory_usage, test_case)
#     # }
#
#     # print(test_result_hihi)
#
#     # if test_result.status_data.strip() == "AC: Accepted (Kết quả đúng)":
#     #     submission.score += 1
#     #     db.commit()
#
#     return {
#         "test_id": test_case.id,
#         "output": output,
#         "time": elapsed_time,
#         "memory": memory_usage,
#         "status_data": status_data_test(db, output, elapsed_time, memory_usage, test_case)
#     }
#
# def status_data_test(db: Session,output: str, elapsed_time: float, memory_usage: float, test_case: models.Test):
#     problem = db.query(models.Problem).filter(models.Problem.id == test_case.problem_id).first()
#     if not problem:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="submission not found")
#
#     if "SyntaxError" in output:
#         return "CE: Compile Error (Lỗi biên dịch)"
#     elif "Runtime Error" in output or output.strip() == "":
#         return "RTE: Runtime Error (Lỗi thực thi)"
#     elif "Invalid Return" in output:
#         return "IR: Invalid Return (Trả về không hợp lệ)"
#
#     if (output.strip() == test_case.output) :
#         if (elapsed_time > problem.max_execution_time):
#             return "TLE: Time Limit Exceeded (Quá giới hạn thời gian)"
#         elif (memory_usage > problem.max_memory_limit):
#             return "MLE: Memory Limit Exceeded (Quá giới hạn bộ nhớ)"
#         else:
#             return "AC: Accepted (Kết quả đúng)"
#     else:
#         return "WA: Wrong Answer (Kết quả sai)"
#
#
#     return "A: Other Error (Lỗi khác)"


# from sqlalchemy.orm import Session
# from .. import models
# from fastapi import HTTPException, status
# import os
# import subprocess
# import asyncio
# import psutil
# import time
# import uuid
# import datetime
#
# async def execute_code(db: Session, submission_id: str):
#     update_submission_status(db, submission_id, "đang chấm")
#
#     await run_code(db, submission_id)
#
#     update_submission_status(db, submission_id, "đã chấm")
#
#
# def update_submission_status(db: Session, submission_id: str, new_status: str):
#     submission = db.query(models.Submission).filter(models.Submission.id == submission_id).first()
#     if submission:
#         submission.status = new_status
#     db.commit()
#
#     print(submission.status)
#
#
# async def run_file_code(db: Session, input_data: str, file_path: str, test_case: models.Test_Result):
#     test_case.status_data = "đang chấm test data"
#     db.commit()
#
#     await run_code_hihi(db, input_data, file_path, test_case)
#
#
# async def run_code(db: Session, submission_id: str):
#     submission = db.query(models.Submission).filter(models.Submission.id == submission_id).first()
#     if not submission:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="submission not found")
#
#     test = db.query(models.Test).filter(models.Test.problem_id == submission.problem_id).all()
#     if not test:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="test not found")
#
#     new_test_result = [models.Test_Result(
#         id=str(uuid.uuid4()),
#         submission_id=submission_id,
#         test_id=test_result.id,
#         output='',
#         time=0,
#         memory=0,
#         status_data="chờ chấm"
#     ) for test_result in test]
#
#     for new_test in new_test_result:
#         db.add(new_test)
#     db.commit()
#
#     for new_test in new_test_result:
#         db.refresh(new_test)
#
#     current_datetime = datetime.datetime.now()
#     formatted_datetime = current_datetime.strftime("%H_%M_%S-%d_%m_%Y")
#     file_path = f"./temp/{formatted_datetime}-{submission.user_id}.{submission.language}"
#     with open(file_path, "w", encoding="utf-8") as program_file:
#         program_file.write(submission.code)
#
#     for test_case in new_test_result:
#         input_data = test_case.tests.input
#         coroutines = []
#
#         coroutines.append(run_file_code(db, input_data, file_path, test_case))
#         await asyncio.gather(*coroutines)
#         await asyncio.sleep(10)
#
#     try:
#         os.remove(file_path)
#         print(f"dã xóa file")
#     except OSError as e:
#         print(f"Lỗi xóa tệp tin: {e}")
#
#     return new_test_result
#
#
# async def run_code_hihi(db: Session, input_data: str, file_path: str, test_case: models.Test_Result):
#     print(test_case.status_data)
#     submission = db.query(models.Submission).filter(models.Submission.id == test_case.submission_id).first()
#     if not submission:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="submission not found")
#
#     memory_usage = 0
#     elapsed_time = 0
#
#     try:
#         if submission.language == "php":
#             run_command = f"php {file_path}"
#             start_time = time.time()  # Đo thời gian bắt đầu thực thi
#             process = psutil.Popen(run_command, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
#                                    stderr=subprocess.STDOUT, text=True)
#             end_time = time.time()  # Đo thời gian kết thúc thực thi
#
#             if process.is_running():
#                 memory_usage = process.memory_info().rss / (1024 * 1024)  # Đo lượng bộ nhớ sử dụng (MB)
#             else:
#                 memory_usage = None
#
#             output, _ = process.communicate(input=input_data)
#
#             elapsed_time = end_time - start_time
#             print(f"Thời gian thực thi: {elapsed_time} giây")
#             print(f"Bộ nhớ sử dụng: {memory_usage} MB")
#
#
#         elif submission.language == "py":
#
#             run_command = f"python {file_path}"
#             start_time = time.time()
#             process = psutil.Popen(run_command, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
#                                    stderr=subprocess.STDOUT, text=True)
#             # end_time = time.time()
#             #
#             # if process.is_running():
#             #     memory_usage = process.memory_info().rss / (1024 * 1024)
#             # else:
#             #     memory_usage = None
#             #
#             # output, _ = process.communicate(input=input_data)
#             #
#             # elapsed_time = end_time - start_time
#             # print(f"Thời gian thực thi: {elapsed_time} giây")
#             # print(f"Bộ nhớ sử dụng: {memory_usage} MB")
#             timeout_seconds = 5
#             if process.is_running():
#                 memory_usage = process.memory_info().rss / (1024 * 1024)  # Chuyển đổi thành MB
#             else:
#                 memory_usage = None
#
#             try:
#                 # Sử dụng process.communicate để đọc output và đợi quá trình hoàn thành
#                 output, _ = process.communicate(input=input_data, timeout=timeout_seconds)
#
#             except subprocess.TimeoutExpired:
#                 # Nếu quá thời gian, ta sẽ kết thúc quá trình
#                 process.terminate()
#                 output = "Quá thời gian"
#
#             end_time = time.time()
#             elapsed_time = end_time - start_time
#
#             print(f"Thời gian thực thi: {elapsed_time} giây")
#             print(f"Bộ nhớ sử dụng: {memory_usage} MB")
#
#         elif submission.language == "js":
#             run_command = f"node {file_path}"
#             start_time = time.time()
#             process = psutil.Popen(run_command, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
#                                    stderr=subprocess.STDOUT, text=True)
#             end_time = time.time()
#
#             if process.is_running():
#                 memory_usage = process.memory_info().rss / (1024 * 1024)
#             else:
#                 memory_usage = None
#
#             output, _ = process.communicate(input=input_data)
#
#             elapsed_time = end_time - start_time
#             print(f"Thời gian thực thi: {elapsed_time} giây")
#             print(f"Bộ nhớ sử dụng: {memory_usage} MB")
#
#         elif submission.language == "cpp":
#
#             current_datetime = datetime.datetime.now()
#             formatted_datetime = current_datetime.strftime("%H_%M_%S-%d_%m_%Y")
#             output_exe = f"./temp/{formatted_datetime}-{submission.user_id}.exe"
#             compile_command = f"g++ {file_path} -o {output_exe}"
#             compile_result = subprocess.run(compile_command, shell=True, stdout=subprocess.PIPE,
#                                             stderr=subprocess.PIPE, text=True, input=input_data)
#
#             if compile_result.returncode == 0:
#                 exe_path = os.path.abspath(output_exe)
#                 run_command = f"{exe_path}"
#                 start_time = time.time()
#                 process = psutil.Popen(run_command, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
#                                        stderr=subprocess.STDOUT, text=True)
#                 # end_time = time.time()
#                 #
#                 # # Đo lượng bộ nhớ sử dụng bằng psutil (nếu quy trình còn tồn tại)
#                 # if process.is_running():
#                 #     memory_usage = process.memory_info().rss / (1024 * 1024)  # Chuyển đổi thành MB
#                 # else:
#                 #     memory_usage = None
#                 #
#                 # output, _ = process.communicate(input=input_data)
#                 #
#                 # elapsed_time = end_time - start_time
#                 # print(f"Thời gian thực thi: {elapsed_time} giây")
#                 # print(f"Bộ nhớ sử dụng: {memory_usage} MB")
#                 #
#                 # os.remove(output_exe)
#                 timeout_seconds = 5
#                 if process.is_running():
#                     memory_usage = process.memory_info().rss / (1024 * 1024)  # Chuyển đổi thành MB
#                 else:
#                     memory_usage = None
#
#                 try:
#                     # Sử dụng process.communicate để đọc output và đợi quá trình hoàn thành
#                     output, _ = process.communicate(input=input_data, timeout=timeout_seconds)
#
#
#                 except subprocess.TimeoutExpired:
#                     # Nếu quá thời gian, ta sẽ kết thúc quá trình
#                     process.terminate()
#                     output = "Quá thời gian"
#
#
#                 end_time = time.time()
#                 elapsed_time = end_time - start_time
#
#                 print(f"Thời gian thực thi: {elapsed_time} giây")
#                 print(f"Bộ nhớ sử dụng: {memory_usage} MB")
#                 print(output)
#
#                 try:
#                     os.remove(output_exe)
#                 except OSError as e:
#                     print(f"Không thể xóa tệp tin: {e}")
#
#             else:
#                 # Xử lý lỗi biên dịch
#                 output = "SyntaxError: " + compile_result.stderr
#
#         else:
#             raise HTTPException(status_code=400, detail="Ngôn ngữ không được hỗ trợ")
#
#         if test_case:
#             test_case.output = output
#             test_case.time = elapsed_time
#             test_case.memory = memory_usage
#             # test_case.status_data = "đã chấm xong test_data"
#             test_case.status_data = status_data_test(db, output, elapsed_time, memory_usage, test_case)
#             db.commit()
#
#             if test_case.status_data == "AC: Accepted (Kết quả đúng)":
#                 # Tăng giá trị của trường points lên 1
#                 if submission:
#                     submission.score += 1
#                     db.commit()
#
#     except subprocess.CalledProcessError as e:
#         output = "Runtime Error: " + e.output
#
#     print(test_case.status_data)
#     print(output)
#
#     return output
#
#
# def status_data_test(db: Session,output: str, elapsed_time: float, memory_usage: float, test_case: models.Test_Result):
#     problem = db.query(models.Problem).filter(models.Problem.id == test_case.tests.problem_id).first()
#     if not problem:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="submission not found")
#
#     if "SyntaxError" in output:
#         return "CE: Compile Error (Lỗi biên dịch)"
#     elif "Runtime Error" in output or output.strip() == "":
#         return "RTE: Runtime Error (Lỗi thực thi)"
#     elif "Invalid Return" in output:
#         return "IR: Invalid Return (Trả về không hợp lệ)"
#
#     if (output.strip() == test_case.tests.output) :
#         if (elapsed_time > problem.max_execution_time):
#             return "TLE: Time Limit Exceeded (Quá giới hạn thời gian)"
#         elif (memory_usage > problem.max_memory_limit):
#             return "MLE: Memory Limit Exceeded (Quá giới hạn bộ nhớ)"
#         else:
#             return "AC: Accepted (Kết quả đúng)"
#     else:
#         return "WA: Wrong Answer (Kết quả sai)"
#
#
#     return "A: Other Error (Lỗi khác)"

