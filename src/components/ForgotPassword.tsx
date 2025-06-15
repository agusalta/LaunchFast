
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function ForgotPassword() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + "/auth", // Luego puedes personalizar
      });
      if (error) throw error;
      setSent(true);
      toast({
        title: "Email enviado",
        description: "Revisa tu bandeja de entrada para instrucciones de recuperación.",
      });
    } catch (error: any) {
      toast({
        title: "Error al enviar email",
        description: error.message || "Inténtalo de nuevo más tarde.",
        variant: "destructive",
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow-sm max-w-md mx-auto">
      <h2 className="font-bold text-lg mb-2">Restablecer contraseña</h2>
      <form onSubmit={handleReset} className="space-y-4">
        <Input
          type="email"
          placeholder="Tu correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoFocus
          disabled={pending || sent}
        />
        <Button type="submit" disabled={pending || sent} className="w-full">
          {pending ? "Enviando..." : sent ? "Enlace enviado" : "Enviar enlace"}
        </Button>
      </form>
      <div className="text-xs mt-2 text-gray-500">
        Recibirás un correo con instrucciones para restablecer tu contraseña.
      </div>
    </div>
  );
}
