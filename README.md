# 🏥 Disease Diagnosis using First-Order Logic (FOL)

> Ứng dụng chẩn đoán bệnh dựa trên triệu chứng sử dụng logic vị từ (First-Order Logic)

![Node.js](https://img.shields.io/badge/Node.js-v18+-green)
![React](https://img.shields.io/badge/React-v19-blue)
![Vite](https://img.shields.io/badge/Vite-v7-purple)

## 📋 Mô tả

Đây là một ứng dụng web cho phép người dùng nhập các triệu chứng của mình và hệ thống sẽ đưa ra dự đoán các bệnh có khả năng cao nhất dựa trên dataset **Disease_Symptom** với hơn 36MB dữ liệu triệu chứng - bệnh.

### ✨ Tính năng chính

- 🔍 **Tìm kiếm triệu chứng** với gợi ý tự động (autocomplete)
- 🏷️ **Tag-based input** - Chọn nhiều triệu chứng dễ dàng
- 📊 **Hiển thị kết quả** với thanh progress bar trực quan
- 🧠 **Thuật toán FOL** - Matching triệu chứng với dataset bệnh

---

## 📁 Cấu trúc Project

```
FOL/
├── 📂 FE-FOL/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── App.jsx               # Component chính
│   │   ├── App.css               # Styling
│   │   └── main.jsx              # Entry point
│   ├── package.json
│   └── vite.config.js
│
├── 📄 server.js                  # Express server (Backend)
├── 📄 FOL.js                     # Logic chẩn đoán bệnh (First-Order Logic)
├── 📄 TF-ITF.js                  # Công cụ tính TF-IDF (recommendation)
├── 📄 suggestion.js              # Công cụ gợi ý triệu chứng liên quan
├── 📄 symptoms.json              # Danh sách 377 triệu chứng
├── 📄 patient.json               # Dữ liệu mẫu bệnh nhân
├── 📄 Disease_Symptom.ndjson     # Dataset bệnh-triệu chứng (36MB)
└── 📄 package.json               # Dependencies backend
```

---

## 🚀 Hướng dẫn cài đặt và chạy

### Yêu cầu hệ thống

- **Node.js** >= 18.x
- **npm** >= 9.x

### Bước 1: Clone project (nếu từ GitHub)

```bash
git clone https://github.com/<username>/FOL.git
cd FOL
```

### Bước 2: Cài đặt dependencies cho Backend

```bash
# Tại thư mục gốc FOL/
npm install
```

### Bước 3: Cài đặt dependencies cho Frontend

```bash
# Di chuyển vào thư mục frontend
cd FE-FOL
npm install
```

### Bước 4: Chạy Backend

```bash
# Quay lại thư mục gốc FOL/
cd ..
npm start
```

> ✅ Server sẽ chạy tại: `http://localhost:3000`

### Bước 5: Chạy Frontend (mở terminal mới)

```bash
cd FE-FOL
npm run dev
```

> ✅ Frontend sẽ chạy tại: `http://localhost:5173`

---

## 🔧 API Endpoints

### POST `/diagnose`

Chẩn đoán bệnh dựa trên danh sách triệu chứng.

**Request Body:**
```json
{
  "symptoms": ["depression", "chest tightness", "breathing fast"]
}
```

**Response:**
```json
{
  "result": [
    ["Anxiety", 5],
    ["Panic disorder", 3],
    ["Depression", 2]
  ]
}
```

---

## 🧠 Thuật toán FOL (First-Order Logic)

Thuật toán hoạt động như sau:

1. **Đọc dataset** `Disease_Symptom.ndjson` theo từng dòng
2. **So khớp triệu chứng** của bệnh nhân với từng bệnh trong dataset
3. **Tính tỷ lệ match** = (số triệu chứng trùng) / (tổng triệu chứng của bệnh)
4. **Lọc bệnh** có tỷ lệ match >= 50%
5. **Sắp xếp** và trả về **Top 5** bệnh có khả năng cao nhất

---

## 📤 Hướng dẫn Push lên GitHub

### Bước 1: Tạo file .gitignore (nếu chưa có)

```bash
# Tại thư mục gốc FOL/
```

Tạo file `.gitignore` với nội dung:

```gitignore
# Dependencies
node_modules/

# Build outputs
dist/
build/

# Environment files
.env
.env.local

# IDE
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
```

### Bước 2: Khởi tạo Git repository

```bash
git init
```

### Bước 3: Thêm tất cả files vào staging

```bash
git add .
```

### Bước 4: Tạo commit đầu tiên

```bash
git commit -m "Initial commit: Disease Diagnosis using FOL"
```

### Bước 5: Tạo repository mới trên GitHub

1. Truy cập [github.com/new](https://github.com/new)
2. Đặt tên repository: `FOL` hoặc `disease-diagnosis-fol`
3. **KHÔNG check** "Initialize this repository with a README" (vì đã có)
4. Click **Create repository**

### Bước 6: Kết nối với remote và push

```bash
# Thay <username> bằng tên GitHub của bạn
git remote add origin https://github.com/<username>/FOL.git
git branch -M main
git push -u origin main
```

---

## 📊 Dataset

File `Disease_Symptom.ndjson` chứa dữ liệu theo định dạng NDJSON (Newline Delimited JSON):

```json
{"disease": "Flu", "symptoms": ["fever", "cough", "headache"]}
{"disease": "Cold", "symptoms": ["nasal congestion", "sore throat"]}
...
```

> ⚠️ **Lưu ý:** File dataset có kích thước lớn (~36MB). Nếu push lên GitHub, hãy đảm bảo repository có đủ dung lượng hoặc sử dụng [Git LFS](https://git-lfs.github.com/).

---

## 🛠️ Scripts hữu ích

| Lệnh | Mô tả |
|------|-------|
| `npm start` | Chạy backend server |
| `npm run dev` (FE-FOL) | Chạy frontend dev server |
| `npm run build` (FE-FOL) | Build production frontend |
| `node TF-ITF.js` | Chạy công cụ TF-IDF recommendation |
| `node suggestion.js` | Chạy công cụ gợi ý triệu chứng |

---

## 👥 Tác giả

- Nguyễn Duy Phát A.K.A Harzy

---

## 📝 License

MIT License - Xem file [LICENSE](LICENSE) để biết thêm chi tiết.
