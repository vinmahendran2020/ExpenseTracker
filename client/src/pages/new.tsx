import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Paperclip } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function NewExpense() {
  const [amount, setAmount] = useState("0");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [_, setLocation] = useLocation();

  const mutation = useMutation({
    mutationFn: async (data: {
      type: "expense";
      amount: string;
      category: string;
      description: string;
    }) => {
      await apiRequest("POST", "/api/transactions", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/balance"] });
      setLocation("/");
    },
  });

  const handleAmountInput = (key: string) => {
    if (key === "." && amount.includes(".")) return;
    if (key === "." && amount === "0") {
      setAmount("0.");
      return;
    }
    if (key === "backspace") {
      setAmount(prev => prev.length > 1 ? prev.slice(0, -1) : "0");
      return;
    }
    setAmount(prev => prev === "0" ? key : prev + key);
  };

  const handleSubmit = () => {
    if (!category || !description || amount === "0") return;

    mutation.mutate({
      type: "expense",
      amount,
      category,
      description,
    });
  };

  return (
    <div className="min-h-screen bg-red-500 text-white">
      <div className="container max-w-md mx-auto px-4 py-6">
        <div className="flex items-center mb-8">
          <button onClick={() => setLocation("/")} className="text-white">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold ml-2">Expense</h1>
        </div>

        <div className="mb-8">
          <div className="text-sm mb-2">How much?</div>
          <div className="text-5xl font-bold">
            <span className="opacity-50">$</span>
            {amount}
          </div>
        </div>

        <Card className="bg-white rounded-t-3xl p-6 absolute bottom-0 left-0 right-0">
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-gray-500 mb-2">Category</label>
              <select 
                className="w-full bg-transparent border-b border-gray-200 py-2 text-gray-900 focus:outline-none"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                <option value="shopping">Shopping</option>
                <option value="subscription">Subscription</option>
                <option value="food">Food</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-2">Description</label>
              <Input 
                className="border-b border-gray-200" 
                placeholder="What was this expense for?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex items-center text-gray-500">
              <Paperclip className="h-4 w-4 mr-2" />
              <span className="text-sm">Add attachment</span>
            </div>

            <Button 
              className="w-full bg-violet-500 hover:bg-violet-600 text-white py-6"
              onClick={handleSubmit}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Adding..." : "Continue"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}