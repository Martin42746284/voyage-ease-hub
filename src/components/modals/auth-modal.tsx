import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AuthForms } from "@/components/forms/auth-forms";

interface AuthModalProps {
  children: React.ReactNode;
  onLogin?: (data: any) => void;
  onRegister?: (data: any) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ children, onLogin, onRegister }) => {
  const [open, setOpen] = React.useState(false);

  const handleLogin = (data: any) => {
    onLogin?.(data);
    setOpen(false);
  };

  const handleRegister = (data: any) => {
    onRegister?.(data);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <AuthForms
          onLogin={handleLogin}
          onRegister={handleRegister}
          onClose={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};