# 🏫 เว็บไซต์โรงเรียน — School Website Template

> **เทมเพลตเว็บไซต์สำหรับโรงเรียนในประเทศไทย** พร้อมระบบ Admin Panel จัดการเนื้อหาผ่าน Google Sheet โดยไม่ต้องเขียนโค้ด

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Active-brightgreen)](https://pages.github.com)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)
[![Template](https://img.shields.io/badge/Use%20this-Template-orange)](../../generate)

---

## ✨ คุณสมบัติ

- 📱 **Responsive Design** — แสดงผลสวยงามบนทุกอุปกรณ์ (มือถือ, แท็บเล็ต, คอมพิวเตอร์)
- 🎨 **ดีไซน์ทันสมัย** — ใช้สีหลักที่โรงเรียนกำหนดได้
- 📊 **Admin Panel** — จัดการเนื้อหาได้เองโดยไม่ต้องเขียนโค้ด
- 🗃️ **Google Sheet เป็นฐานข้อมูล** — ฟรี ไม่ต้องจ่ายค่า hosting
- 🌐 **GitHub Pages** — ฟรีทั้ง Hosting และ Domain
- 🖼️ **รองรับ Google Drive & Google Photos**
- 🔐 **ระบบ Login** — มีรหัสผ่านป้องกัน Admin Panel

### เนื้อหาที่จัดการได้ผ่าน Admin Panel

| หัวข้อ | รายละเอียด |
|---|---|
| 🏫 ข้อมูลโรงเรียน | ชื่อ, สังกัด, ที่อยู่, เบอร์โทร, โลโก้ |
| 🖼️ Hero Banner | รูปหน้าแรก, ข้อความต้อนรับ, ปุ่มลิงก์ |
| 👁️ วิสัยทัศน์/พันธกิจ | วิสัยทัศน์, พันธกิจ, เป้าประสงค์ |
| 🎬 วิดีโอ | YouTube embed |
| 👔 สาส์นผู้บริหาร | ชื่อ, รูปภาพ, สาส์น |
| 📰 ข่าวประชาสัมพันธ์ | เพิ่ม/แก้ไข/ลบข่าว |
| 📅 ปฏิทินกิจกรรม | กิจกรรมประจำปี |
| 👥 บุคลากร | รูปภาพ, ชื่อ, ตำแหน่ง |
| ⭐ จุดเด่นโรงเรียน | รูปภาพ, คำอธิบาย |
| 🏆 รางวัล/ความภาคภูมิใจ | รางวัลต่างๆ |
| 📸 ภาพกิจกรรม | อัลบั้มภาพ พร้อม Lightbox |

---

## 🚀 วิธีใช้งาน (4 ขั้นตอน)

### ขั้นที่ 1 — คัดลอก Template

กดปุ่ม **"Use this template"** (สีเขียว) ด้านบนขวา แล้วสร้าง Repository ใหม่

> หรือจะ **Fork** ก็ได้ แต่แนะนำ "Use this template" เพื่อได้ Repository สะอาด

### ขั้นที่ 2 — เปิด GitHub Pages

1. ไปที่ **Settings** ของ Repository ใหม่
2. เลือก **Pages** ในเมนูซ้าย
3. Source: เลือก **Deploy from a branch**
4. Branch: เลือก **main** → folder: **/ (root)**
5. กด **Save**

รอ 1-2 นาที เว็บจะพร้อมที่ `https://[username].github.io/[repo-name]/`

### ขั้นที่ 3 — ตั้งค่าเว็บไซต์

เปิด URL: `https://[username].github.io/[repo-name]/setup-wizard.html`

ทำตาม Wizard 4 ขั้นตอน:
1. กรอกข้อมูลโรงเรียน
2. เชื่อมต่อ Google Sheet
3. ตั้งรหัสผ่าน Admin
4. เสร็จสิ้น! 🎉

### ขั้นที่ 4 — เพิ่มเนื้อหา

เปิด `https://[username].github.io/[repo-name]/admin.html` แล้ว login เพื่อจัดการเนื้อหา

---

## 📋 วิธีตั้งค่า Google Sheet (ละเอียด)

### 1. สร้าง Google Sheet

ไปที่ [sheets.google.com](https://sheets.google.com) แล้วสร้าง Spreadsheet ใหม่

### 2. เพิ่ม Apps Script

1. เปิด Google Sheet → **Extensions → Apps Script**
2. ลบโค้ดเดิม → วางโค้ดจากไฟล์ `apps-script/Code.gs`
3. กด **Save** (Ctrl+S)

### 3. สร้าง Sheet อัตโนมัติ

1. ใน Apps Script เลือก function: `setupSheets`
2. กด **Run** ▶
3. อนุญาต Permission ที่ขอ

### 4. Deploy เป็น Web App

1. กด **Deploy → New deployment**
2. Type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone**
5. กด **Deploy** → Copy URL ที่ได้

### 5. กรอก URL ใน setup-wizard.html

---

## 🗂️ โครงสร้างไฟล์

```
school-website-template/
├── index.html            ← เว็บหน้าหลัก
├── admin.html            ← Admin Panel
├── setup-wizard.html     ← ตัวช่วยตั้งค่าครั้งแรก
├── facebook.html         ← หน้าแสดงโพสต์ Facebook
├── 404.html              ← หน้า Error 404
├── README.md             ← คู่มือ (ไฟล์นี้)
└── apps-script/
    └── Code.gs           ← โค้ด Google Apps Script
```

---

## 🖼️ วิธีใส่รูปภาพ

รองรับ URL รูปภาพจาก:

| แหล่งที่มา | ตัวอย่าง URL | หมายเหตุ |
|---|---|---|
| **Google Drive** | `https://drive.google.com/file/d/[ID]/view` | แปลงอัตโนมัติ |
| **Google Drive (thumbnail)** | `https://drive.google.com/thumbnail?id=[ID]` | แปลงอัตโนมัติ |
| **Google Photos** | `https://lh3.googleusercontent.com/pw/...` | ใช้ได้เลย |
| **URL ทั่วไป** | `https://example.com/image.jpg` | ใช้ได้เลย |

> **วิธีเอา URL จาก Google Drive**: เปิดรูป → คลิกขวา → Get link → Copy link

---

## ❓ FAQ

**Q: ทำไมรูปภาพแสดงไม่ขึ้น?**
A: ตรวจสอบว่าไฟล์ใน Google Drive ตั้งเป็น "Anyone with the link" แล้ว

**Q: แก้ไขข้อมูลแล้วเว็บไม่อัปเดต?**
A: กดรีเฟรชเบราว์เซอร์ หรือรอ 1-2 นาที

**Q: ลืมรหัสผ่าน Admin?**
A: เปิด Google Sheet → Sheet "settings" → หาแถว `admin_pass` แล้วแก้ไขโดยตรง

**Q: อยากเปลี่ยนสีธีม?**
A: แก้ไขค่าสีใน CSS `:root` ในไฟล์ `index.html` และ `admin.html`

**Q: ต้องเสียค่าใช้จ่ายอะไรบ้าง?**
A: ฟรีทั้งหมด! GitHub Pages ฟรี, Google Sheet ฟรี

---

## 📞 ติดต่อ / ปัญหา

หากพบปัญหาหรือต้องการความช่วยเหลือ:
- เปิด **Issue** ใน GitHub Repository นี้
- หรือ Fork แล้วแก้ไข → ส่ง **Pull Request**

---

## 📄 License

MIT License — ใช้ได้ฟรี แก้ไขได้ แจกจ่ายได้

---

*Made with ❤️ for Thai Schools*
