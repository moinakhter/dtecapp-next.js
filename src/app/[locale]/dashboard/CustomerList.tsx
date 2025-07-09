
import { useEffect, useState } from "react";
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

interface Customer {
  customer_id: string;
  email: string;
  first_name: string;
  last_name: string;
  shop_url: string;
  phone: string;
}

const PAGE_SIZE = 5;

const CustomerList = ({ storeUrl }: { storeUrl: string }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/wp-json/custom-api/v1/customers-by-shop-url?shop_url=${encodeURIComponent(
          storeUrl
        )}&page=${page}&limit=${PAGE_SIZE}`
      );
      const result = await res.json();
      setCustomers(result.data || []);
      setTotal(result.total || 0);
    } catch (error) {
      console.error("Failed to load customers", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (email: string) => {
    if (!confirm("Are you sure you want to delete this customer?")) return;
    try {
      const res = await fetch(`/wp-json/custom-api/v1/delete-customer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, shop_url: storeUrl }),
      });

      const result = await res.json();
      if (res.ok) {
        fetchCustomers();
        toast.success(result.message || "Customer deleted successfully", {
          richColors: true,
        });
      } else {
        toast.error(result.message || "Failed to delete customer", {
          richColors: true,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [storeUrl, page]);

  if (loading) return <p>Loading customers...</p>;
  if (customers.length === 0) return <p>No customers found.</p>;

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div className="mt-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((c,index) => (
            <TableRow key={index}>
              <TableCell>
                {c.first_name} {c.last_name}
              </TableCell>
              <TableCell>{c.email}</TableCell>
              <TableCell>{c.phone}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(c.email)}
                >
                  <Trash className="mr-2 h-4 w-4 text-red-500" />
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
