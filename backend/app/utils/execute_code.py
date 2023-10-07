from sqlalchemy.orm import Session
from .. import models
from fastapi import HTTPException, status
import os
import subprocess
import asyncio
import psutil
import time
import uuid


async def execute_code(db: Session, submission_id: str):
    update_submission_status(db, submission_id, "đang chấm")

    await run_code(db, submission_id)

    update_submission_status(db, submission_id, "đã chấm")


def update_submission_status(db: Session, submission_id: str, new_status: str):
    submission = db.query(models.Submission).filter(models.Submission.id == submission_id).first()
    if submission:
        submission.status = new_status
    db.commit()

    print(submission.status)


async def run_file_code(db: Session, input_data: str, file_path: str, test_case: models.Test_Result):
    test_case.status_data = "đang chấm test data"
    db.commit()

    await run_code_hihi(db, input_data, file_path, test_case)


async def run_code(db: Session, submission_id: str):
    submission = db.query(models.Submission).filter(models.Submission.id == submission_id).first()
    if not submission:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="submission not found")

    test = db.query(models.Test).filter(models.Test.problem_id == submission.problem_id).all()
    if not test:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="test not found")

    new_test_result = [models.Test_Result(
        id=str(uuid.uuid4()),
        submission_id=submission_id,
        test_id=test_result.id,
        output='',
        time=0,
        memory=0,
        status_data="chờ chấm"
    ) for test_result in test]

    for new_test in new_test_result:
        db.add(new_test)
    db.commit()

    for new_test in new_test_result:
        db.refresh(new_test)

    file_path = f"./temp/{submission.user_id}.{submission.language}"
    with open(file_path, "w", encoding="utf-8") as program_file:
        program_file.write(submission.code)

    for test_case in new_test_result:
        input_data = test_case.tests.input
        coroutines = []

        coroutines.append(run_file_code(db, input_data, file_path, test_case))
        await asyncio.gather(*coroutines)
        await asyncio.sleep(10)

    try:
        os.remove(file_path)
        print(f"dã xóa file")
    except OSError as e:
        print(f"Lỗi xóa tệp tin: {e}")

    return new_test_result


async def run_code_hihi(db: Session, input_data: str, file_path: str, test_case: models.Test_Result):
    print(test_case.status_data)
    submission = db.query(models.Submission).filter(models.Submission.id == test_case.submission_id).first()
    if not submission:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="submission not found")

    try:
        if submission.language == "php":
            run_command = f"php {file_path}"
            start_time = time.time()  # Đo thời gian bắt đầu thực thi
            process = psutil.Popen(run_command, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                                   stderr=subprocess.STDOUT, text=True)
            end_time = time.time()  # Đo thời gian kết thúc thực thi

            if process.is_running():
                memory_usage = process.memory_info().rss / (1024 * 1024)  # Đo lượng bộ nhớ sử dụng (MB)
            else:
                memory_usage = None

            output, _ = process.communicate(input=input_data)

            elapsed_time = end_time - start_time
            print(f"Thời gian thực thi: {elapsed_time} giây")
            print(f"Bộ nhớ sử dụng: {memory_usage} MB")


        elif submission.language == "py":

            run_command = f"python {file_path}"  # đc
            start_time = time.time()
            process = psutil.Popen(run_command, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                                   stderr=subprocess.STDOUT, text=True)
            end_time = time.time()

            if process.is_running():
                memory_usage = process.memory_info().rss / (1024 * 1024)
            else:
                memory_usage = None

            output, _ = process.communicate(input=input_data)

            elapsed_time = end_time - start_time
            print(f"Thời gian thực thi: {elapsed_time} giây")
            print(f"Bộ nhớ sử dụng: {memory_usage} MB")

        elif submission.language == "js":
            run_command = f"node {file_path}"
            start_time = time.time()
            process = psutil.Popen(run_command, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                                   stderr=subprocess.STDOUT, text=True)
            end_time = time.time()

            if process.is_running():
                memory_usage = process.memory_info().rss / (1024 * 1024)
            else:
                memory_usage = None

            output, _ = process.communicate(input=input_data)

            elapsed_time = end_time - start_time
            print(f"Thời gian thực thi: {elapsed_time} giây")
            print(f"Bộ nhớ sử dụng: {memory_usage} MB")

        elif submission.language == "cpp":
            output_exe = f"./temp/{submission.user_id}.exe"
            compile_command = f"g++ {file_path} -o {output_exe}"
            compile_result = subprocess.run(compile_command, shell=True, stdout=subprocess.PIPE,
                                            stderr=subprocess.PIPE, text=True, input=input_data)

            if compile_result.returncode == 0:
                exe_path = os.path.abspath(output_exe)
                run_command = f"{exe_path}"
                start_time = time.time()
                process = psutil.Popen(run_command, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                                       stderr=subprocess.STDOUT, text=True)
                end_time = time.time()

                # Đo lượng bộ nhớ sử dụng bằng psutil (nếu quy trình còn tồn tại)
                if process.is_running():
                    memory_usage = process.memory_info().rss / (1024 * 1024)  # Chuyển đổi thành MB
                else:
                    memory_usage = None

                output, _ = process.communicate(input=input_data)

                elapsed_time = end_time - start_time
                print(f"Thời gian thực thi: {elapsed_time} giây")
                print(f"Bộ nhớ sử dụng: {memory_usage} MB")

                os.remove(output_exe)

            else:
                # Xử lý lỗi biên dịch
                output = "Lỗi biên dịch: " + compile_result.stderr

        else:
            raise HTTPException(status_code=400, detail="Ngôn ngữ không được hỗ trợ")

        if test_case:
            test_case.output = output
            test_case.time = elapsed_time
            test_case.memory = memory_usage
            test_case.status_data = "đã chấm xong test_data"
            db.commit()

    except subprocess.CalledProcessError as e:
        output = "Lỗi thực thi: " + e.output

    print(test_case.status_data)
    print(output)

    return output

# from sqlalchemy.orm import Session
# from .. import models
# from fastapi import HTTPException, status
# import os
# import subprocess
# import asyncio
# import psutil
# import time
# import uuid
#
#
# async def execute_code (db: Session, id: str):
#     update_submission_status(db, id, "đang chấm")
#
#     await run_code(db, id)
#
#     update_submission_status(db, id, "đã chấm")
#
#
# def update_submission_status(db: Session, submission_id: int, new_status: str):
#     submission = db.query(models.Submission).filter(models.Submission.id == submission_id).first()
#     if submission:
#         submission.status = new_status
#     db.commit()
#
#     print(submission.status)
#
# def update_test_result_status(db: Session, new_status_data: str, test_case: models.Test_Result):
#     test_case.status_data = new_status_data
#     db.commit()
#
#     print(test_case.status_data)
#
#
# async def run_file_code(db: Session, input_data: str,file_path, test_result: models.Test_Result):
#     update_test_result_status(db, f'đang chấm test data ', test_result)
#
#     await run_code_hihi(db, input_data,file_path, test_result)
#
#     # update_test_result_status(db, f'đã chấm test data', test_result)
#
#
#
# async def run_code(db: Session, id: int):
#
#     submission = db.query(models.Submission).filter(models.Submission.id == id).first()
#     if not submission:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="submission not found")
#
#     test = db.query(models.Test).filter(models.Test.problem_id == submission.problem_id).all()
#     if not test:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="test not found")
#
#     new_test_result = [models.Test_Result(
#         id=str(uuid.uuid4()),
#         submission_id=id,
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
#     file_path = f"./temp/{submission.user_id}.{submission.language}"
#     with open(file_path, "w", encoding="utf-8") as program_file:
#         program_file.write(submission.code)
#
#
#     for test_case in new_test_result:
#         input_data = test_case.tests.input
#         coroutines = []
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
# async def run_code_hihi(db: Session, input_data: str ,file_path: str, test_result: models.Test_Result):
#     submission = db.query(models.Submission).filter(models.Submission.id == test_result.submission_id).first()
#     if not submission:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="submission not found")
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
#             run_command = f"python {file_path}"  # đc
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
#             output_exe = f"./temp/{submission.user_id}.exe"
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
#                 end_time = time.time()
#
#                 # Đo lượng bộ nhớ sử dụng bằng psutil (nếu quy trình còn tồn tại)
#                 if process.is_running():
#                     memory_usage = process.memory_info().rss / (1024 * 1024)  # Chuyển đổi thành MB
#                 else:
#                     memory_usage = None
#
#                 output, _ = process.communicate(input=input_data)
#
#                 elapsed_time = end_time - start_time
#                 print(f"Thời gian thực thi: {elapsed_time} giây")
#                 print(f"Bộ nhớ sử dụng: {memory_usage} MB")
#
#                 os.remove(output_exe)
#
#             else:
#                 # Xử lý lỗi biên dịch
#                 output = "Lỗi biên dịch: " + compile_result.stderr
#
#         else:
#             raise HTTPException(status_code=400, detail="Ngôn ngữ không được hỗ trợ")
#
#         if test_result:
#             test_result.output = output
#             test_result.time = elapsed_time
#             test_result.memory = memory_usage
#             test_result.status_data = "đã chấm xong test_data"
#             db.commit()
#
#     except subprocess.CalledProcessError as e:
#         output = "Lỗi thực thi: " + e.output
#
#     print(output)
#
#     return output



# from sqlalchemy.orm import Session
# from .. import models, schemas
# from fastapi import HTTPException, status
# import os
# import subprocess
# import asyncio
# import psutil
# import time
# import uuid
#
#
# async def execute_code (db: Session, id: str):
#     update_submission_status(db, id, "đang chấm")
#
#     # Chạy mã và cập nhật kết quả
#     await run_code(db, id)
#
#     # Cập nhật trạng thái thành "đã chấm" và lưu kết quả
#     update_submission_status(db, id, "đã chấm")
#
#
# def update_submission_status(db: Session, submission_id: int, new_status: str):
#     # Cập nhật trạng thái của bài nộp trong cơ sở dữ liệu
#     submission = db.query(models.Submission).filter(models.Submission.id == submission_id).first()
#     if submission:
#         submission.status = new_status
#     db.commit()
#
#     print(submission.status)
#
# async def run_code(db: Session, id: int):
#
#     submission = db.query(models.Submission).filter(models.Submission.id == id).first()
#     if not submission:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="submission not found")
#
#     test = db.query(models.Test).filter(models.Test.problem_id == submission.problem_id).all()
#     if not test:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="test not found")
#
#     file_path = f"./temp/{submission.user_id}.{submission.language}"
#     with open(file_path, "w", encoding="utf-8") as program_file:
#         program_file.write(submission.code)
#
#     new_test_result = [models.Test_Result(
#         id=str(uuid.uuid4()),
#         submission_id=id,
#         test_id=test_result.id,
#         output='',
#         time=0,
#         memory=0,
#         status_data="chờ chấm"
#     ) for test_result in test]
#     for new_test in new_test_result:
#         db.add(new_test)  # Thêm từng đối tượng vào session
#     db.commit()
#     for new_test in new_test_result:
#         db.refresh(new_test)
#
#     for test_case in test:
#         input_data = test_case.input
#
#         try:
#             if submission.language == "php":
#                 run_command = f"php {file_path}"
#                 start_time = time.time()  # Đo thời gian bắt đầu thực thi
#                 process = psutil.Popen(run_command, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
#                                        stderr=subprocess.STDOUT, text=True)
#                 end_time = time.time()  # Đo thời gian kết thúc thực thi
#
#                 if process.is_running():
#                     memory_usage = process.memory_info().rss / (1024 * 1024)  # Đo lượng bộ nhớ sử dụng (MB)
#                 else:
#                     memory_usage = None
#
#                 output, _ = process.communicate(input=input_data)
#
#                 elapsed_time = end_time - start_time
#                 print(f"Thời gian thực thi: {elapsed_time} giây")
#                 print(f"Bộ nhớ sử dụng: {memory_usage} MB")
#
#
#             elif submission.language == "py":
#
#                 run_command = f"python {file_path}"  # đc
#                 start_time = time.time()
#                 process = psutil.Popen(run_command, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
#                                        stderr=subprocess.STDOUT, text=True)
#                 end_time = time.time()
#
#                 if process.is_running():
#                     memory_usage = process.memory_info().rss / (1024 * 1024)
#                 else:
#                     memory_usage = None
#
#                 output, _ = process.communicate(input=input_data)
#
#                 elapsed_time = end_time - start_time
#                 print(f"Thời gian thực thi: {elapsed_time} giây")
#                 print(f"Bộ nhớ sử dụng: {memory_usage} MB")
#
#             elif submission.language == "js":
#                 run_command = f"node {file_path}"
#                 start_time = time.time()
#                 process = psutil.Popen(run_command, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
#                                        stderr=subprocess.STDOUT, text=True)
#                 end_time = time.time()
#
#                 if process.is_running():
#                     memory_usage = process.memory_info().rss / (1024 * 1024)
#                 else:
#                     memory_usage = None
#
#                 output, _ = process.communicate(input=input_data)
#
#                 elapsed_time = end_time - start_time
#                 print(f"Thời gian thực thi: {elapsed_time} giây")
#                 print(f"Bộ nhớ sử dụng: {memory_usage} MB")
#
#             elif submission.language == "cpp":
#                 output_exe = f"./temp/{submission.user_id}.exe"
#                 compile_command = f"g++ {file_path} -o {output_exe}"
#                 compile_result = subprocess.run(compile_command, shell=True, stdout=subprocess.PIPE,
#                                                 stderr=subprocess.PIPE, text=True, input=input_data)
#
#                 if compile_result.returncode == 0:
#                     exe_path = os.path.abspath(output_exe)
#                     run_command = f"{exe_path}"
#                     start_time = time.time()
#                     process = psutil.Popen(run_command, shell=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
#                                            stderr=subprocess.STDOUT, text=True)
#                     end_time = time.time()
#
#                     # Đo lượng bộ nhớ sử dụng bằng psutil (nếu quy trình còn tồn tại)
#                     if process.is_running():
#                         memory_usage = process.memory_info().rss / (1024 * 1024)  # Chuyển đổi thành MB
#                     else:
#                         memory_usage = None
#
#                     output, _ = process.communicate(input=input_data)
#
#                     elapsed_time = end_time - start_time
#                     print(f"Thời gian thực thi: {elapsed_time} giây")
#                     print(f"Bộ nhớ sử dụng: {memory_usage} MB")
#
#                     os.remove(output_exe)
#
#                 else:
#                     # Xử lý lỗi biên dịch
#                     output = "Lỗi biên dịch: " + compile_result.stderr
#
#             else:
#                 raise HTTPException(status_code=400, detail="Ngôn ngữ không được hỗ trợ")
#
#
#         except subprocess.CalledProcessError as e:
#             output = "Lỗi thực thi: " + e.output
#
#         print(output)
#
#         await asyncio.sleep(10)
#
#     try:
#         os.remove(file_path)
#         print(f"dã xóa file")
#     except OSError as e:
#         print(f"Lỗi xóa tệp tin: {e}")
#
#     # Trả về kết quả cuối cùng (có thể tùy chỉnh dựa trên nhu cầu của bạn)
#     return output