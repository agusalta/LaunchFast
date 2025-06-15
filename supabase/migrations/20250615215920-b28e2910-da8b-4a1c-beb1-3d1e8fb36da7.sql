
-- Tabla para solicitudes de cambio o abandono de plan y refund tracking
CREATE TABLE IF NOT EXISTS public.plan_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL, -- 'refund', 'downgrade', 'upgrade', 'cancel'
  old_plan TEXT,
  new_plan TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'processed'
  refund_amount INTEGER,
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Habilita RLS
ALTER TABLE public.plan_requests ENABLE ROW LEVEL SECURITY;

-- Políticas para que cada usuario solo pueda ver/crear sus propias solicitudes
CREATE POLICY "Users can view their own plan requests"
  ON public.plan_requests
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own plan requests"
  ON public.plan_requests
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- (Opcional) Si decides manejar reset tokens custom, descomenta y revisa:
-- CREATE TABLE IF NOT EXISTS public.password_reset_tokens (
--   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
--   user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
--   token TEXT NOT NULL,
--   expires_at TIMESTAMPTZ NOT NULL,
--   used BOOLEAN NOT NULL DEFAULT false,
--   created_at TIMESTAMPTZ NOT NULL DEFAULT now()
-- );
-- ALTER TABLE public.password_reset_tokens ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "User can use own token"
--   ON public.password_reset_tokens
--   FOR SELECT
--   USING (auth.uid() = user_id);
-- CREATE POLICY "User can create own reset request"
--   ON public.password_reset_tokens
--   FOR INSERT
--   WITH CHECK (auth.uid() = user_id);
