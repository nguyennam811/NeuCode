from sqlalchemy.orm import Session
from .. import models
from fastapi import HTTPException, status
import os
import subprocess
import psutil
import time
import datetime
import secrets
import re

async def run_file_code(db: Session, file_path: str, test_case: models.Test, language: str, timeout_seconds: float, memory_limit_mb: float):
    input = re.sub(r'[\(\)\{\}\[\]\s]+', '\n', test_case.input)
    print(input)
    elapsed_time = timeout_seconds
    memory_usage = memory_limit_mb
    try:
        if language == "php":
            try:
                run_command = f"php {file_path}"
                start_time = time.time()  # Đo thời gian bắt đầu thực thi
                process = psutil.Popen(run_command, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                                       stderr=subprocess.STDOUT, text=True)

                while process.is_running():
                    memory_usage = process.memory_info().rss / (1024 * 1024)  # Chuyển đổi thành MB

                    if time.time() - start_time > timeout_seconds:
                        process.terminate()
                        output = "Quá thời gian"
                        break

                    if memory_usage > memory_limit_mb:
                        process.terminate()
                        output = "Quá bộ nhớ"
                        break

                    output, _ = process.communicate(input=input, timeout=timeout_seconds)

                end_time = time.time()
                elapsed_time = end_time - start_time

                print(f"Thời gian thực thi: {elapsed_time} giây")
                print(f"Bộ nhớ sử dụng: {memory_usage} MB")
                print(output)

            except subprocess.TimeoutExpired:
                output = "Quá thời gian"

        elif language == "py":
            try:
                run_command = f"python {file_path}"
                start_time = time.time()
                process = psutil.Popen(run_command, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                                       stderr=subprocess.STDOUT, text=True)

                while process.is_running():
                    memory_usage = process.memory_info().rss / (1024 * 1024)  # Chuyển đổi thành MB

                    if time.time() - start_time > timeout_seconds:
                        process.terminate()
                        output = "Quá thời gian"
                        break

                    if memory_usage > memory_limit_mb:
                        process.terminate()
                        output = "Quá bộ nhớ"
                        break

                    output, _ = process.communicate(input=input, timeout=timeout_seconds)

                end_time = time.time()
                elapsed_time = end_time - start_time

                print(f"Thời gian thực thi: {elapsed_time} giây")
                print(f"Bộ nhớ sử dụng: {memory_usage} MB")
                print(output)

            except subprocess.TimeoutExpired:
                output = "Quá thời gian"

        # elif language == "js":
        #     try:
        #         run_command = f"node {file_path}"
        #         start_time = time.time()
        #         process = psutil.Popen(run_command, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
        #                                stderr=subprocess.STDOUT, text=True)
        #         while process.is_running():
        #             memory_usage = process.memory_info().rss / (1024 * 1024)  # Chuyển đổi thành MB
        #
        #             if time.time() - start_time > timeout_seconds:
        #                 process.terminate()
        #                 output = "Quá thời gian"
        #                 break
        #
        #             if memory_usage > memory_limit_mb:
        #                 process.terminate()
        #                 output = "Quá bộ nhớ"
        #                 break
        #
        #             output, _ = process.communicate(input=test_case.input, timeout=timeout_seconds)
        #
        #         end_time = time.time()
        #         elapsed_time = end_time - start_time
        #
        #         print(f"Thời gian thực thi: {elapsed_time} giây")
        #         print(f"Bộ nhớ sử dụng: {memory_usage} MB")
        #         print(output)
        #
        #     except subprocess.TimeoutExpired:
        #         output = "Quá thời gian"

        elif language == "cpp":
            try:
                random = secrets.token_hex(3)
                current_datetime = datetime.datetime.now()
                formatted_datetime = current_datetime.strftime("%H_%M_%S-%d_%m_%Y")
                output_exe = f"./temp/{formatted_datetime}-{random}.exe"
                compile_command = f"g++ {file_path} -o {output_exe}"
                compile_result = subprocess.run(compile_command, shell=True, stdout=subprocess.PIPE,
                                                stderr=subprocess.PIPE, text=True, input=test_case.input)

                if compile_result.returncode == 0:
                    exe_path = os.path.abspath(output_exe)
                    run_command = f"{exe_path}"
                    start_time = time.time()
                    process = psutil.Popen(run_command, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                                           stderr=subprocess.STDOUT, text=True)

                    while process.is_running():
                        memory_usage = process.memory_info().rss / (1024 * 1024)  # Chuyển đổi thành MB

                        if time.time() - start_time > timeout_seconds:
                            process.terminate()
                            output = "Quá thời gian"
                            break

                        if memory_usage > memory_limit_mb:
                            process.terminate()
                            output = "Quá bộ nhớ"
                            break

                        output, _ = process.communicate(input=input, timeout=timeout_seconds)

                    end_time = time.time()
                    elapsed_time = end_time - start_time

                    print(f"Thời gian thực thi: {elapsed_time} giây")
                    print(f"Bộ nhớ sử dụng: {memory_usage} MB")
                    print(output)

                    try:
                        os.remove(output_exe)
                    except OSError as e:
                        print(f"Không thể xóa tệp tin: {e}")

                else:
                    # Xử lý lỗi biên dịch
                    output = "SyntaxError: " + compile_result.stderr
            except subprocess.TimeoutExpired:
                output = "Quá thời gian"

        else:
            raise HTTPException(status_code=400, detail="Ngôn ngữ không được hỗ trợ")

    except subprocess.CalledProcessError as e:
        output = "Runtime Error: " + e.output


    return {
        "test_id": test_case.id,
        "output": output,
        "time": elapsed_time,
        "memory": memory_usage,
        "status_data": status_data_test(db, output, elapsed_time, memory_usage, test_case)
    }

def status_data_test(db: Session,output: str, elapsed_time: float, memory_usage: float, test_case: models.Test):
    problem = db.query(models.Problem).filter(models.Problem.id == test_case.problem_id).first()
    if not problem:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="submission not found")

    if "SyntaxError" in output:
        return "CE: Compile Error (Lỗi biên dịch)"
    elif "Runtime Error" in output or output.strip() == "":
        return "RTE: Runtime Error (Lỗi thực thi)"
    elif "Invalid Return" in output:
        return "IR: Invalid Return (Trả về không hợp lệ)"

    if (output.strip() == test_case.output) :
        if (elapsed_time > problem.max_execution_time):
            return "TLE: Time Limit Exceeded (Quá giới hạn thời gian)"
        elif (memory_usage > problem.max_memory_limit):
            return "MLE: Memory Limit Exceeded (Quá giới hạn bộ nhớ)"
        else:
            return "AC: Accepted (Kết quả đúng)"
    else:
        return "WA: Wrong Answer (Kết quả sai)"


    return "A: Other Error (Lỗi khác)"

#
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
# import secrets
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