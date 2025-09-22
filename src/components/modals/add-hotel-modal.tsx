import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AddHotelForm } from "@/components/forms/add-hotel-form";

interface AddHotelModalProps {
  children: React.ReactNode;
  onSubmit?: (data: any) => void;
}

export const AddHotelModal: React.FC<AddHotelModalProps> = ({ children, onSubmit }) => {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (data: any) => {
    onSubmit?.(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto p-0">
        <AddHotelForm
          onSubmit={handleSubmit}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};