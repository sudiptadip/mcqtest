"use client";

import { TableComp } from "@/components/common/TableComp";
import apiCallPostRequest from "@/lib/api/apiCallPostRequest";
import { Organization } from "@/lib/interface/Database";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const columns: ColumnDef<Organization>[] = [
  { accessorKey: "Name", header: "Name" },
  { accessorKey: "Slug", header: "Slug" },
  { accessorKey: "WebsiteUrl", header: "Website URL" },
];

const OrganizationList = () => {
  const [data, setData] = useState<Organization[]>([]);

  const fetchOrganizations = async () => {
    const res = await apiCallPostRequest("sp_Organization", 2);
    setData(res.isSuccess ? res.result : []);
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You can't undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await apiCallPostRequest("sp_Organization", 4, { Id: id });
      if (res.isSuccess) {
        Swal.fire("Deleted!", "Organization has been deleted.", "success");
        fetchOrganizations();
      } else {
        Swal.fire("Error", res.result || "Something went wrong.", "error");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Organization List</h1>
      <TableComp
        data={data}
        columns={columns}
        createUrl="/admin/news/organization-create"
        renderActions={(row) => (
          <div className="flex gap-3">
            <Link
              href={`/admin/news/organization-create/${row.Id}`}
              className="text-yellow-600"
            >
              <Pencil className="h-[18px] w-[18px]" />
            </Link>
            <button
              onClick={() => handleDelete(Number(row.Id))}
              className="text-red-600"
            >
              <Trash className="h-[18px] w-[18px]" />
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default OrganizationList;