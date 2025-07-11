# Todo App - React + TypeScript + Context API

แอปพลิเคชัน Todo สร้างด้วย React, TypeScript และ Vite โปรเจคนี้แสดงให้เห็นการใช้งาน global state management ด้วย React Context API พร้อมฟีเจอร์การกรองข้อมูล

## 🚀 เริ่มต้นใช้งาน

### ข้อกำหนดของระบบ
- Node.js (เวอร์ชัน 16 ขึ้นไป)
- npm หรือ yarn package manager

### การติดตั้งและรันโปรแกรม

1. **โคลน repository และเข้าสู่โฟลเดอร์โปรเจค**
   ```bash
   cd todo-app
   ```

2. **ติดตั้ง dependencies**
   ```bash
   npm install
   ```

3. **เริ่มต้น development server**
   ```bash
   npm run dev
   ```

4. **สร้างไฟล์สำหรับ production**
   ```bash
   npm run build
   ```

5. **ดูตัวอย่าง production build**
   ```bash
   npm run preview
   ```

แอปพลิเคชันจะพร้อมใช้งานที่ `http://localhost:5173`

## 🎯 ฟีเจอร์ต่าง ๆ

- ✅ เพิ่ม todo ใหม่
- ✅ ทำเครื่องหมายว่าเสร็จแล้ว/ยังไม่เสร็จ
- ✅ ลบ แก้ไข todo
- ✅ กรอง todo ตามสถานะ (ทั้งหมด, ยังไม่เสร็จ, เสร็จแล้ว)
- ✅ TypeScript เพื่อความปลอดภัยของข้อมูล
- ✅ การจัดการ global state ด้วย Context API

## 🏗️ โครงสร้างโปรเจค

```
src/
├── components/          # UI components ที่ใช้ซ้ำได้
│   ├── TodoForm.tsx    # ฟอร์มสำหรับเพิ่ม todo ใหม่
│   ├── TodoItem.tsx    # component สำหรับ todo แต่ละรายการ
│   ├── TodoList.tsx    # container สำหรับแสดงรายการ todo
│   └── TodoStatus.tsx  # ปุ่มกรองและสถิติต่าง ๆ
├── contexts/           # React Context สำหรับ global state
│   └── TodoContext.tsx # การจัดการ state ของ todo
├── types/             # คำจำกัดความประเภทข้อมูลใน TypeScript
│   └── todo.ts        # interface ของ Todo
├── App.tsx            # component หลักของแอปพลิเคชัน
├── main.tsx           # จุดเริ่มต้นของแอปพลิเคชัน
└── index.css          # สไตล์ทั่วไปด้วย Tailwind CSS
```

## 🔧 ตัวเลือกการพัฒนาและเหตุผล

### 1. **React Context API สำหรับการจัดการ State**
- **ทำไมถึงเลือก Context API?** 
  - เป็นโซลูชันที่มาพร้อมกับ React ไม่ต้องติดตั้งไลบรารีเพิ่ม
  - เหมาะสำหรับแอปพลิเคชันขนาดเล็กถึงกลาง
  - ช่วยลด prop drilling ระหว่าง components
  - มี type safety เมื่อใช้ร่วมกับ TypeScript

- **รายละเอียดการใช้งาน:**
  - สร้าง `TodoContext` พร้อม custom hook `useTodo` เพื่อความสะดวกในการใช้งาน
  - รวมการทำงานทั้งหมดของ todo ไว้ในที่เดียว (เพิ่ม, เปลี่ยนสถานะ, ลบ, กรอง)
  - คำนวณ `filteredTodos` ตาม filter state ปัจจุบัน

### 2. **การใช้ TypeScript**
- **ประโยชน์:**
  - ความปลอดภัยของข้อมูลสำหรับ todos และ filter states
  - การรองรับที่ดีขึ้นจาก IDE พร้อม autocomplete
  - จับข้อผิดพลาดได้ตั้งแต่เวลา compile
  - โค้ดอธิบายตัวเองได้ด้วย interface definitions

- **ประเภทข้อมูลหลัก:**
  ```typescript
  interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
  }
  
  type FilterType = "all" | "completed" | "notCompleted";
  ```

### 3. **สถาปัตยกรรม Component**
- **การแบ่งแยกหน้าที่:**
  - `TodoForm`: จัดการ input และการสร้าง todo
  - `TodoItem`: จัดการการทำงานของ todo แต่ละรายการ
  - `TodoList`: แสดงผลรายการ todo ที่ถูกกรองแล้ว
  - `TodoStatus`: จัดการการกรอง
  - `App`: layout หลักและการจัดเรียง component

- **ประโยชน์:**
  - Components สามารถใช้ซ้ำได้
  - ง่ายต่อการทดสอบและบำรุงรักษา
  - ขอบเขตความรับผิดชอบที่ชัดเจน

### 4. **การใช้งานระบบกรอง**
- **การกรอง:**
  - Filter state ถูกจัดการใน Context
  - `filteredTodos` อัปเดตอัตโนมัติ

- **ตัวเลือกการกรอง:**
  - **ทั้งหมด**: แสดง todo ทั้งหมด
  - **ยังไม่เสร็จ**: แสดงเฉพาะ todo ที่ยังไม่เสร็จ
  - **เสร็จแล้ว**: แสดงเฉพาะ todo ที่เสร็จแล้ว

### 5. **การใช้ Tailwind CSS**
- **ทำไมถึงเลือก Tailwind?**
  - utility-first ที่ช่วยพัฒนาได้เร็ว
  - ระบบดีไซน์ที่สอดคล้องกัน
  - รองรับ responsive design ตั้งแต่เริ่มต้น
  - ขนาดไฟล์ production ที่เล็ก

## 🔄 Data Flow of State

1. **เพิ่ม Todo**: `TodoForm` → `addTodo()` → Context อัปเดต → Components ทั้งหมด re-render
2. **เปลี่ยนสถานะเสร็จ**: `TodoItem` → `toggleTodo()` → Context อัปเดต → รายการที่กรองแล้วอัปเดต
3. **การกรอง**: `TodoStatus` → `setFilter()` → Context คำนวณ `filteredTodos` → `TodoList` อัปเดต
4. **การลบ**: `TodoItem` → `deleteTodo()` → Context อัปเดต → รายการ re-render

### การตั้งค่า ESLint

หากคุณกำลังพัฒนาแอปพลิเคชันสำหรับ production เราแนะนำให้อัปเดตการตั้งค่าเพื่อเปิดใช้งาน type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // การตั้งค่าอื่น ๆ...

      // ลบ tseslint.configs.recommended และแทนที่ด้วยอันนี้
      ...tseslint.configs.recommendedTypeChecked,
      // หรือใช้อันนี้สำหรับ rules ที่เข้มงวดกว่า
      ...tseslint.configs.strictTypeChecked,
      // หรือเพิ่มอันนี้สำหรับ stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // การตั้งค่าอื่น ๆ...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // ตัวเลือกอื่น ๆ...
    },
  },
])
```

### React Linting เพิ่มเติม

คุณยังสามารถติดตั้ง [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) และ [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) สำหรับ React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // การตั้งค่าอื่น ๆ...
      // เปิดใช้งาน lint rules สำหรับ React
      reactX.configs['recommended-typescript'],
      // เปิดใช้งาน lint rules สำหรับ React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // ตัวเลือกอื่น ๆ...
    },
  },
])
```

## 🤝 การมีส่วนร่วม

1. Fork repository
2. สร้าง feature branch (`git checkout -b feature/new-feature`)
3. Commit การเปลี่ยนแปลงของคุณ (`git commit -m 'Add new feature'`)
4. Push ไปยัง branch (`git push origin feature/new-feature`)
5. เปิด Pull Request

## 📄 ใบอนุญาต

โปรเจคนี้เป็น open source และใช้ใบอนุญาต [MIT License](LICENSE)

---

**สร้างด้วย โดยใช้ React, TypeScript และ Context API**
