"use client";

import { TableComp } from "@/components/common/TableComp";
import apiCallPostRequest from "@/lib/api/apiCallPostRequest";
import { News } from "@/lib/interface/Database";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const columns: ColumnDef<News>[] = [
  { accessorKey: "Title", header: "Title" },
  { accessorKey: "Slug", header: "Slug" },
  { accessorKey: "CategoryId", header: "Category" },
  { accessorKey: "PublishDate", header: "Publish Date" },
  { accessorKey: "IsPublished", header: "Published" },
];

const NewsList = () => {
  const [data, setData] = useState<News[]>([]);
  const fetchAll = async () => {
    const res = await apiCallPostRequest("sp_News", 2);
    setData(res.isSuccess ? res.result : []);
  };
  useEffect(() => { fetchAll(); }, []);
  const handleDelete = async (id: number) => {
    const r = await Swal.fire({
      title: "Delete news?",
      icon: "warning", showCancelButton: true,
      confirmButtonText: "Yes, delete!"
    });
    if (r.isConfirmed) {
      const res = await apiCallPostRequest("sp_News", 4, { Id: id });
      if (res.isSuccess) {
        Swal.fire("Deleted!", "News deleted.", "success");
        fetchAll();
      } else {
        Swal.fire("Error", res.result || "Failed", "error");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">News</h1>
      <TableComp
        data={data}
        columns={columns}
        createUrl="/admin/news/news-create"
        renderActions={row => (
          <div className="flex gap-3">
            <Link href={`/admin/news/news-create/${row.Id}`} className="text-yellow-600">
              <Pencil className="h-5 w-5"/>
            </Link>
            <button onClick={() => handleDelete(Number(row.Id))} className="text-red-600">
              <Trash className="h-5 w-5"/>
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default NewsList;