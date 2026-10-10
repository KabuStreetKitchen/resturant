-- Tuesday is the weekly day off (Ruhetag).
INSERT INTO public.opening_hours (day_of_week, open_time, close_time, is_closed)
VALUES ('Tuesday', NULL, NULL, true)
ON CONFLICT (day_of_week) DO UPDATE SET
  open_time = NULL,
  close_time = NULL,
  is_closed = true;
