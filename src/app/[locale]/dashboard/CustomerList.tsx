"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface Customer {
  customer_id: string;
  email: string;
  first_name: string;
  last_name: string;
  shop_url: string;
  phone: string;
}

const PAGE_SIZE = 5;
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ;
 

const fetchCustomers = async ({
  storeUrl,
  page,
}: {
  storeUrl: string;
  page: number;
}) => {
 
  const normalizedUrl = storeUrl.replace(/\/+$/, "");
  const res = await fetch(
  `${API_BASE_URL}/customers-by-shop-url/?shop_url=${encodeURIComponent(
    normalizedUrl
  )}&page=${page}&limit=5`
);

  if (!res.ok) throw new Error("Failed to fetch customers");
  return res.json();
};


const deleteCustomer = async ({
  email,
  shop_url,
}: {
  email: string;
  shop_url: string;
}) => {
  const normalizedUrl = shop_url.replace(/\/+$/, "");  

  const res = await fetch(`${API_BASE_URL}/delete-customer/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, shop_url: normalizedUrl }),
  });

  const result = await res.json();

  if (!res.ok || result.message !== "Customer deleted successfully") {
    throw new Error(result.message || "Failed to delete customer");
  }

  return result;
};


const CustomerList = ({ storeUrl }: { storeUrl: string }) => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["customers", storeUrl, page],
    queryFn: () => fetchCustomers({ storeUrl, page }),
  });

  const mutation = useMutation({
    mutationFn: deleteCustomer,
   onSuccess: (data) => {
  if (data.message === "Customer deleted successfully") {
    toast.success("Customer deleted successfully", { richColors: true });
    queryClient.invalidateQueries({
      queryKey: ["customers", storeUrl, page],
    });
  } else {
    toast.error(data.message || "Customer not found", {
      richColors: true,
    });
  }
}
,
    onError: (error: unknown) => {
      const message =
        error && typeof error === "object" && "message" in error
          ? (error as { message?: string }).message
          : "Failed to delete customer";
      toast.error(message || "Failed to delete customer", {
        richColors: true,
      });
    },
  });
 const t =useTranslations("CustomerList");
  const total = data?.total || 0;
  const customers: Customer[] = data?.data || [];
  const totalPages = Math.ceil(total / PAGE_SIZE);

  if (isLoading) return <p>{t("loading")}</p>;
  if (isError || customers.length === 0) return <p>{t("no_customers")}</p>;

  return (
    <div className="mt-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-start">{t("name")}</TableHead>
            <TableHead className="text-start">{t("email")}</TableHead>
            <TableHead className="text-start">{t("phone")}</TableHead>
            <TableHead className="text-start">{t("actions")}</TableHead>
          </TableRow>
        </TableHeader>
   <TableBody>
  {customers.map((c, index) => (
    <TableRow key={index} className="align-middle">
      <TableCell className="py-3 text-start">{c.first_name} {c.last_name}</TableCell>
      <TableCell className="py-3 text-start">{c.email}</TableCell>
      <TableCell className="py-3 text-start">{c.phone}</TableCell>
      <TableCell className="py-3 text-start ">
        <Button
          variant="destructive"
          size="icon"
          className="p-2"
          onClick={() => {
            if (confirm(t("confirm_delete"))) {
              mutation.mutate({ email: c.email, shop_url: storeUrl });
            }
          }}
        >
          <Trash className="h-4 w-4 text-red-500" />
        </Button>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

      </Table>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) setPage(page - 1);
                }}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={page === index + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(index + 1);
                  }}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (page < totalPages) setPage(page + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default CustomerList;
