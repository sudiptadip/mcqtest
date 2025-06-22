// app/admin/layout.tsx
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <aside>Admin Sidebar</aside>
        <div className="admin-content">{children}</div>
      </body>
    </html>
  );
}