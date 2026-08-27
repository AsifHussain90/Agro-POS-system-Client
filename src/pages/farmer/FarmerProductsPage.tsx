import { useState } from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { Edit2, Plus, Sprout } from "lucide-react";
import { useProducts, useSaveProduct } from "@/hooks/useApi";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types";
import type { ProductPayload } from "@/types/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PageHeader } from "@/components/shared/PageHeader";
import { DataTable } from "@/components/shared/DataTable";
import { ProductForm } from "@/components/forms/ProductForm";

export function FarmerProductsPage() {
  const { data } = useProducts();
  const saveProductMutation = useSaveProduct();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const products = data?.data ?? [];

  const handleSave = (values: ProductPayload) => {
    saveProductMutation.mutate(
      {
        ...values,
        id: editingProduct?.id,
      },
      {
        onSuccess: () => {
          setIsCreateOpen(false);
          setEditingProduct(null);
        },
      },
    );
  };

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Produce & Crop",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex items-center gap-3">
            {item.images?.[0] ? (
              <img
                src={item.images[0]}
                alt={item.name}
                className="h-10 w-10 rounded-md object-cover border border-outline-variant/60 shrink-0"
              />
            ) : (
              <div className="h-10 w-10 rounded-md bg-surface-container flex items-center justify-center shrink-0">
                <Sprout className="h-5 w-5 text-secondary" />
              </div>
            )}
            <div>
              <p className="font-semibold text-sm text-on-surface">{item.name}</p>
              <p className="text-xs text-on-surface-variant line-clamp-1">{item.description}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <Badge variant="outline" className="text-[11px]">
          {row.original.category}
        </Badge>
      ),
    },
    {
      accessorKey: "price",
      header: "Price / Unit",
      cell: ({ row }) => (
        <span className="font-semibold text-sm text-on-surface">
          {formatCurrency(row.original.price)} / {row.original.unit}
        </span>
      ),
    },
    {
      accessorKey: "stock",
      header: "Available Stock",
      cell: ({ row }) => {
        const stock = row.original.stock;
        return (
          <div className="flex items-center gap-2">
            <span className={`text-sm font-semibold ${stock <= 5 ? "text-destructive" : "text-on-surface"}`}>
              {stock} {row.original.unit}
            </span>
            {stock <= 5 && (
              <Badge variant="warning" className="text-[10px] px-1.5 py-0">
                Low Stock
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.isActive ? "success" : "destructive"}>
          {row.original.isActive ? "Active Listing" : "Hidden"}
        </Badge>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs h-8"
          onClick={() => setEditingProduct(row.original)}
        >
          <Edit2 className="h-3 w-3" />
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Crop & Product Catalog"
        description="Manage your inventory levels, market pricing, and active listings"
        actions={
          <Button onClick={() => setIsCreateOpen(true)} className="gap-2 shadow-level-1">
            <Plus className="h-4 w-4" />
            Add Crop Listing
          </Button>
        }
      />

      <DataTable
        columns={columns}
        data={products}
        emptyMessage="No produce listed yet. Click 'Add Crop Listing' to create your first item."
      />

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>List New Crop / Produce</DialogTitle>
            <DialogDescription>
              Provide crop details, pricing, harvest batch images, and available inventory.
            </DialogDescription>
          </DialogHeader>
          <ProductForm
            onSubmit={handleSave}
            isSubmitting={saveProductMutation.isPending}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={Boolean(editingProduct)} onOpenChange={(open) => !open && setEditingProduct(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Produce Listing</DialogTitle>
            <DialogDescription>
              Update information for {editingProduct?.name}
            </DialogDescription>
          </DialogHeader>
          {editingProduct && (
            <ProductForm
              defaultValues={{
                name: editingProduct.name,
                description: editingProduct.description,
                category: editingProduct.category,
                price: editingProduct.price,
                unit: editingProduct.unit,
                stock: editingProduct.stock,
                images: editingProduct.images,
                isActive: editingProduct.isActive,
              }}
              onSubmit={handleSave}
              isSubmitting={saveProductMutation.isPending}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
