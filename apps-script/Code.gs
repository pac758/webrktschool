// ============================================================
//  SCHOOL WEBSITE CMS — Google Apps Script Backend
//  Template Version 1.0
//  วิธีใช้: copy โค้ดนี้ทั้งหมดไปวางใน Google Apps Script
//           แล้ว Deploy เป็น Web App (Anyone can access)
// ============================================================

const SHEET_NAMES = [
  'settings','director','news','calendar','team',
  'features','achievements','gallery','quicklinks','docs','footerlinks'
];

function doGet(e) {
  const sheet = (e.parameter.sheet || '').trim();
  if (!sheet) return jsonResp({ error: 'missing sheet param' });

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ws = ss.getSheetByName(sheet);
  if (!ws) return jsonResp({ error: `sheet "${sheet}" not found` });

  try {
    const data = readSheet(ws, sheet);
    return jsonResp(data);
  } catch(err) {
    return jsonResp({ error: err.message });
  }
}

function doPost(e) {
  let body;
  try { body = JSON.parse(e.postData.contents); } catch(ex) { return jsonResp({ error: 'invalid JSON' }); }

  const action = body.action || '';
  const secret = body.secret || '';
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // ตรวจรหัสผ่าน
  const settingsWs = ss.getSheetByName('settings');
  const storedSecret = settingsWs ? getCellByKey(settingsWs, 'admin_pass') : '';
  const defaultSecret = 'admin123';
  if (secret !== (storedSecret || defaultSecret)) {
    return jsonResp({ error: 'unauthorized' });
  }

  if (action === 'saveSettings') return saveSettings(ss, body.data || {});
  if (action === 'saveDirector') return saveRow(ss, 'director', body.data || {});
  if (action === 'saveList')     return saveList(ss, body.sheet, body.rows || []);
  if (action === 'changePassword') return changePassword(ss, body.data || {});

  return jsonResp({ error: `unknown action: ${action}` });
}

// ─── READ ────────────────────────────────────────────────────
function readSheet(ws, sheetName) {
  const data = ws.getDataRange().getValues();
  if (!data || data.length < 1) return sheetName === 'settings' ? {} : [];

  // settings และ director เก็บแบบ key-value (col A = key, col B = value)
  if (sheetName === 'settings' || sheetName === 'director') {
    const obj = {};
    data.forEach(row => {
      const key = String(row[0] || '').trim();
      if (key) obj[key] = String(row[1] !== undefined ? row[1] : '');
    });
    return obj;
  }

  // sheet อื่นๆ เก็บแบบ header row + data rows
  const headers = data[0].map(h => String(h || '').trim());
  return data.slice(1)
    .filter(row => row.some(c => c !== '' && c !== null && c !== undefined))
    .map(row => {
      const obj = {};
      headers.forEach((h, i) => { if (h) obj[h] = String(row[i] !== undefined ? row[i] : ''); });
      return obj;
    });
}

function getCellByKey(ws, key) {
  const data = ws.getDataRange().getValues();
  for (const row of data) {
    if (String(row[0]).trim() === key) return String(row[1] || '');
  }
  return '';
}

// ─── WRITE ───────────────────────────────────────────────────
function saveSettings(ss, data) {
  let ws = ss.getSheetByName('settings');
  if (!ws) ws = ss.insertSheet('settings');

  // อ่านข้อมูลเดิม
  const existing = {};
  const vals = ws.getDataRange().getValues();
  vals.forEach(row => { if (row[0]) existing[String(row[0]).trim()] = row; });

  Object.keys(data).forEach(key => {
    if (existing[key]) {
      // update row ที่มีอยู่แล้ว
      const rowIdx = vals.findIndex(r => String(r[0]).trim() === key);
      if (rowIdx >= 0) ws.getRange(rowIdx + 1, 2).setValue(data[key]);
    } else {
      // เพิ่ม row ใหม่
      ws.appendRow([key, data[key]]);
    }
  });

  return jsonResp({ success: true });
}

function saveRow(ss, sheetName, data) {
  let ws = ss.getSheetByName(sheetName);
  if (!ws) ws = ss.insertSheet(sheetName);

  ws.clearContents();
  Object.keys(data).forEach(key => {
    ws.appendRow([key, data[key]]);
  });

  return jsonResp({ success: true });
}

function saveList(ss, sheetName, rows) {
  let ws = ss.getSheetByName(sheetName);
  if (!ws) ws = ss.insertSheet(sheetName);

  ws.clearContents();
  if (!rows || !rows.length) return jsonResp({ success: true });

  const headers = Object.keys(rows[0]);
  ws.appendRow(headers);
  rows.forEach(row => ws.appendRow(headers.map(h => row[h] || '')));

  return jsonResp({ success: true });
}

function changePassword(ss, data) {
  const { new_user, new_pass } = data;
  if (!new_pass) return jsonResp({ error: 'missing new_pass' });
  return saveSettings(ss, {
    admin_user: new_user || 'admin',
    admin_pass: new_pass
  });
}

// ─── SETUP (เรียกครั้งแรก) ───────────────────────────────────
function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // settings sheet (key-value)
  let ws = ss.getSheetByName('settings');
  if (!ws) ws = ss.insertSheet('settings');
  if (ws.getLastRow() === 0) {
    const defaults = [
      ['name_th',        'โรงเรียนตัวอย่าง'],
      ['name_en',        'Example School'],
      ['dept',           'สพป.จังหวัด เขต X'],
      ['phone',          '0XX-XXX-XXXX'],
      ['email',          'admin@school.ac.th'],
      ['address',        'ต.ตัวอย่าง อ.ตัวอย่าง จ.ตัวอย่าง XXXXX'],
      ['website',        ''],
      ['vision',         'พัฒนาผู้เรียนให้มีคุณภาพตามมาตรฐาน'],
      ['motto',          'การศึกษาดี มีวินัย ใฝ่เรียนรู้ คู่คุณธรรม'],
      ['students',       '100+'],
      ['staff',          '10'],
      ['years',          '50'],
      ['awards',         '5+'],
      ['logo',           ''],
      ['facebook',       'https://www.facebook.com/'],
      ['youtube',        ''],
      ['maps',           ''],
      ['maps_nav',       ''],
      ['hero_badge',     'ยินดีต้อนรับสู่โรงเรียนของเรา'],
      ['hero_heading1',  'พัฒนาผู้เรียน'],
      ['hero_heading2',  'ความเป็นเลิศ'],
      ['hero_desc',      'มุ่งมั่นจัดการศึกษาอย่างมีคุณภาพ เพื่อสร้างเด็กไทยที่พร้อมก้าวสู่อนาคต'],
      ['hero_image',     ''],
      ['hero_image_badge','รางวัลดีเด่น'],
      ['about_section_desc', 'โรงเรียนของเรามุ่งมั่นจัดการศึกษาขั้นพื้นฐานเพื่อพัฒนาคุณภาพชีวิตของเยาวชน'],
      ['about_vision',   'พัฒนาผู้เรียนให้มีคุณภาพตามมาตรฐาน สร้างสังคมแห่งการเรียนรู้ ควบคู่คุณธรรม'],
      ['about_mission',  'ส่งเสริมความร่วมมือระหว่างโรงเรียน ครอบครัว และชุมชน\nพัฒนาระบบบริหารจัดการให้มีความปลอดภัย\nส่งเสริมความเป็นเลิศและสมรรถนะผู้เรียน'],
      ['about_goals',    'นักเรียนรักชาติ ศาสน์ กษัตริย์ และเป็นพลเมืองดี\nนักเรียนได้รับโอกาสทางการศึกษาอย่างทั่วถึง'],
      ['about_attributes','fas fa-heart|รักชาติ ศาสน์ กษัตริย์\nfas fa-balance-scale|ซื่อสัตย์สุจริต\nfas fa-user-clock|มีวินัย\nfas fa-book-reader|ใฝ่เรียนรู้\nfas fa-seedling|อยู่อย่างพอเพียง\nfas fa-briefcase|มุ่งมั่นในการทำงาน\nfas fa-praying-hands|รักความเป็นไทย\nfas fa-hands-helping|มีจิตสาธารณะ'],
      ['vid_title1',     'เรียนรู้'],
      ['vid_title2',     'ที่โรงเรียนของเรา'],
      ['vid_desc',       'บรรยากาศการเรียนรู้ที่ส่งเสริมความสุขและพัฒนาการของผู้เรียน'],
      ['vid_url',        ''],
      ['admin_user',     'admin'],
      ['admin_pass',     'admin123'],
    ];
    ws.getRange(1, 1, defaults.length, 2).setValues(defaults);
  }

  // director sheet (key-value)
  ws = ss.getSheetByName('director');
  if (!ws) ws = ss.insertSheet('director');
  if (ws.getLastRow() === 0) {
    ws.getRange(1,1,5,2).setValues([
      ['name',    'นายตัวอย่าง ใจดี'],
      ['role',    'ผู้อำนวยการโรงเรียน'],
      ['title',   'มุ่งมั่นพัฒนาผู้เรียนสู่ความเป็นเลิศ'],
      ['message', 'โรงเรียนของเรามีความมุ่งมั่นที่จะพัฒนาคุณภาพการศึกษาในทุกมิติ โดยเน้นผู้เรียนเป็นสำคัญ'],
      ['photo',   ''],
    ]);
  }

  // news sheet
  ws = ss.getSheetByName('news');
  if (!ws) ws = ss.insertSheet('news');
  if (ws.getLastRow() === 0) {
    ws.appendRow(['date','title','excerpt','link','fb_post']);
    ws.appendRow(['1 ม.ค.','ยินดีต้อนรับปีการศึกษาใหม่','ต้อนรับครู นักเรียน และผู้ปกครองทุกท่านสู่ปีการศึกษาใหม่','','']);
  }

  // calendar sheet
  ws = ss.getSheetByName('calendar');
  if (!ws) ws = ss.insertSheet('calendar');
  if (ws.getLastRow() === 0) {
    ws.appendRow(['day','month','title','detail']);
    ws.appendRow(['16','ม.ค.','วันครู','กิจกรรมวันครูแห่งชาติ']);
  }

  // team sheet
  ws = ss.getSheetByName('team');
  if (!ws) ws = ss.insertSheet('team');
  if (ws.getLastRow() === 0) {
    ws.appendRow(['name','role','photo','crop','order']);
    ws.appendRow(['นายตัวอย่าง ใจดี','ผู้อำนวยการโรงเรียน','','50% 0%','1']);
  }

  // features sheet
  ws = ss.getSheetByName('features');
  if (!ws) ws = ss.insertSheet('features');
  if (ws.getLastRow() === 0) {
    ws.appendRow(['title','desc','photo','icon','order']);
    ws.appendRow(['วิชาการเข้มข้น','เน้นทักษะการคิดวิเคราะห์และการประยุกต์ใช้ความรู้','','fas fa-brain','1']);
  }

  // achievements sheet
  ws = ss.getSheetByName('achievements');
  if (!ws) ws = ss.insertSheet('achievements');
  if (ws.getLastRow() === 0) {
    ws.appendRow(['title','detail','icon']);
    ws.appendRow(['รางวัลดีเด่น','ระดับเขตพื้นที่การศึกษา','fas fa-trophy']);
  }

  // gallery sheet
  ws = ss.getSheetByName('gallery');
  if (!ws) ws = ss.insertSheet('gallery');
  if (ws.getLastRow() === 0) {
    ws.appendRow(['title','caption','photo']);
    ws.appendRow(['กิจกรรมโรงเรียน','ภาพบรรยากาศกิจกรรมต่างๆ','']);
  }

  // quicklinks sheet
  ws = ss.getSheetByName('quicklinks');
  if (!ws) ws = ss.insertSheet('quicklinks');
  if (ws.getLastRow() === 0) {
    ws.appendRow(['title','url','icon']);
    ws.appendRow(['DLTV เรียนทางไกล','https://www.dltv.ac.th','fas fa-tv']);
  }

  // docs sheet
  ws = ss.getSheetByName('docs');
  if (!ws) ws = ss.insertSheet('docs');
  if (ws.getLastRow() === 0) {
    ws.appendRow(['title','url','icon']);
    ws.appendRow(['ปฏิทินวิชาการ','#','fas fa-file-pdf']);
  }

  // footerlinks sheet
  ws = ss.getSheetByName('footerlinks');
  if (!ws) ws = ss.insertSheet('footerlinks');
  if (ws.getLastRow() === 0) {
    ws.appendRow(['title','url']);
    ws.appendRow(['กระทรวงศึกษาธิการ','https://www.obec.go.th/']);
    ws.appendRow(['คุรุสภา','https://www.ksp.or.th/']);
    ws.appendRow(['DLTV เรียนทางไกล','https://www.dltv.ac.th']);
  }

  return ContentService.createTextOutput('✅ Setup complete! All sheets created.');
}

// ─── HELPER ──────────────────────────────────────────────────
function jsonResp(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
