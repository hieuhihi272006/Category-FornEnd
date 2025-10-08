import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true, // 🔥 ép Vite kiểm tra file thủ công
      interval: 100, // tốc độ kiểm tra (100ms)
    },
    host: true,
    strictPort: true,
  },
});
// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // ⚙️ Cấu hình ổn định cho Windows + Vite
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: "localhost",
//     port: 5173, // hoặc cổng bạn muốn
//     open: true, // tự mở trình duyệt
//     watch: {
//       usePolling: true, // bắt buộc để fix lỗi CSS không reload
//       interval: 300, // 300ms là tốc độ an toàn
//     },
//   },
// });
