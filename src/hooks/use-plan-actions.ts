
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type Action = "refund" | "downgrade" | "upgrade" | "cancel";

export function usePlanActions() {
  const { user, session } = useAuth();
  const { toast } = useToast();
  const [pending, setPending] = useState(false);

  // Solicita refund, downgrade, upgrade, o cancelación de plan
  const requestPlanAction = async ({
    action,
    oldPlan,
    newPlan,
  }: {
    action: Action;
    oldPlan: string;
    newPlan?: string;
  }) => {
    if (!user || !session) {
      toast({
        title: "No autenticado",
        description: "Inicia sesión para continuar.",
        variant: "destructive",
      });
      return;
    }
    setPending(true);
    try {
      const { data, error } = await supabase.from("plan_requests").insert([
        {
          user_id: user.id,
          action,
          old_plan: oldPlan,
          new_plan: newPlan,
        },
      ]);
      if (error) throw error;
      toast({
        title: "Solicitud enviada",
        description:
          action === "refund"
            ? "Solicitud de reembolso recibida. Te contactaremos pronto."
            : "¡Petición enviada correctamente!",
      });
    } catch (error: any) {
      toast({
        title: "Error en la solicitud",
        description: error.message || "No se pudo procesar la acción.",
        variant: "destructive",
      });
    } finally {
      setPending(false);
    }
  };

  return { pending, requestPlanAction };
}
