import subprocess

# Danh sách các file cần chạy
files_to_run = ['backend\\Category_Api.py', 'backend\\Task_Api.py', 'backend\\User_Api.py']

# Chạy từng file đồng thời
processes = [subprocess.Popen(['python', file]) for file in files_to_run]

# Đợi tất cả các file hoàn thành
for process in processes:
    process.wait()
