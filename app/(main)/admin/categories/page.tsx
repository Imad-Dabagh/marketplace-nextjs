import { CategoryService } from "@/lib/services/category.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Plus } from "lucide-react";
import { createCategory, deleteCategory } from "./actions";

export default async function AdminCategoriesPage() {
  const categories = await CategoryService.getAllCategories();

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <div>
        <h1 className="text-3xl font-bold text-zinc-950">Manage Categories</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Keep marketplace browsing clean by organizing listings into clear categories.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-[1fr_2fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add New Category</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={createCategory} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input name="name" placeholder="e.g. Real Estate" required />
              </div>
              <Button type="submit" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Existing Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between py-3"
                >
                  <div>
                    <p className="font-medium text-zinc-900">{category.name}</p>
                    <p className="text-xs text-zinc-500">{category.slug}</p>
                  </div>
                  <form action={deleteCategory.bind(null, category.id)}>
                    <Button
                      type="submit"
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
