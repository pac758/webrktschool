# โรงเรียนบ้านโคกยางหนองถนน — Website

เว็บไซต์โรงเรียนบ้านโคกยางหนองถนน สพป.บุรีรัมย์ เขต 3

## ไฟล์หลัก

| ไฟล์ | คำอธิบาย |
|------|----------|
| `index.html` | หน้าเว็บไซต์หลัก |
| `admin.html` | ระบบหลังบ้าน (Admin Panel) |

## วิธี Deploy บน GitHub Pages

1. Push โค้ดทั้งหมดขึ้น GitHub Repository
2. ไปที่ **Settings → Pages**
3. Source: **Deploy from a branch** → branch: `main` → folder: `/ (root)`
4. กด Save — รอประมาณ 1-2 นาที
5. เว็บจะพร้อมใช้ที่ `https://[username].github.io/[repo-name]/`

## วิธีฝังใน Google Sites

### หน้าเว็บหลัก
1. เปิด Google Sites → เลือกหน้าที่ต้องการ
2. Insert → **Embed** → วาง URL:
   ```
   https://[username].github.io/[repo-name]/index.html
   ```

### หน้า Admin
1. สร้างหน้าใหม่ใน Google Sites ชื่อ "Admin"
2. Insert → **Embed** → วาง URL:
   ```
   https://[username].github.io/[repo-name]/admin.html
   ```

## การตั้งค่า Google Apps Script

1. สร้าง Google Sheet ใหม่ ชื่อ `RKT School CMS`
2. Extensions → Apps Script → วาง code จากหน้า Admin (เมนู "ตั้งค่า API")
3. Deploy → New deployment → Web app
4. Execute as: **Me**, Who has access: **Anyone**
5. Copy URL → วางในหน้า Admin ของเว็บไซต์

## Login Admin

- User: `admin`
- Pass: `admin123`
