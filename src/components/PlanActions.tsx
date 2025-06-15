
import { useSubscription } from "@/hooks/use-subscription";
import { usePlanActions } from "@/hooks/use-plan-actions";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Button } from "./ui/button";
import { plans } from "@/config/plans";

type Props = {};

export default function PlanActions({}: Props) {
  const { subscription, refreshSubscription } = useSubscription();
  const { requestPlanAction, pending } = usePlanActions();
  const { toast } = useToast();
  const [selectedPlanId, setSelectedPlanId] = useState<string>("");

  if (!subscription) return null;

  // Cálculo de diferencia de precio para cambios de plan
  const handleChangePlan = async () => {
    const oldPlan = subscription.plan_name;
    const oldPlanObj = plans.find((p) => p.name === oldPlan);
    const newPlanObj = plans.find((p) => p.id === selectedPlanId);

    if (!newPlanObj || !oldPlanObj) {
      toast({
        title: "Error",
        description: "Selecciona un plan válido.",
        variant: "destructive",
      });
      return;
    }
    // Calcula diferencia y muestra info
    const priceDiff = (newPlanObj.price - (oldPlanObj.price || 0));
    let msg: string;

    if (priceDiff === 0) {
      msg = "El plan nuevo tiene el mismo precio. No hay cargos ni reembolsos.";
    } else if (priceDiff > 0) {
      msg = `Vas a pagar sólo la diferencia: $${priceDiff.toFixed(2)} (${newPlanObj.name} - ${oldPlanObj.name})`;
    } else {
      msg =
        `Recibirás un reembolso proporcional de $${Math.abs(priceDiff).toFixed(2)} (${oldPlanObj.name} → ${newPlanObj.name})`;
    }

    if (!window.confirm(msg + "\n¿Deseas continuar?")) return;
    await requestPlanAction({
      action: priceDiff > 0 ? "upgrade" : "downgrade",
      oldPlan: oldPlanObj.name,
      newPlan: newPlanObj.name,
    });
    refreshSubscription();
  };

  const handleRefundOrCancel = async () => {
    if (
      !window.confirm(
        "¿Seguro que quieres cancelar tu suscripción y solicitar un reembolso proporcional al periodo no usado?"
      )
    ) {
      return;
    }
    await requestPlanAction({
      action: "refund",
      oldPlan: subscription.plan_name,
    });
    refreshSubscription();
  };

  return (
    <div className="my-4 border rounded-md bg-gray-50 p-4">
      <h3 className="font-bold mb-2">Opciones de plan</h3>
      <div className="space-x-2 mb-2">
        <Button
          variant="destructive"
          size="sm"
          disabled={pending}
          onClick={handleRefundOrCancel}
        >
          Cancelar y solicitar reembolso proporcional
        </Button>
      </div>
      <div className="mt-3 flex flex-col md:flex-row gap-2">
        <select
          value={selectedPlanId}
          onChange={(e) => setSelectedPlanId(e.target.value)}
          className="rounded border px-3 py-2"
        >
          <option value="">Selecciona un plan para cambiar</option>
          {plans
            .filter((p) => p.name !== subscription.plan_name)
            .map((p) => (
              <option value={p.id} key={p.id}>
                {p.name} (${p.price})
              </option>
            ))}
        </select>
        <Button
          onClick={handleChangePlan}
          disabled={!selectedPlanId || pending}
          size="sm"
        >
          Cambiar de plan
        </Button>
      </div>
      <div className="text-xs mt-2 text-gray-500">
        El cálculo de refund o diferencia es informativo. Confirmación vía email.
      </div>
    </div>
  );
}
