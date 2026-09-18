# Recepción de formularios y donativos

Los formularios envían datos a las rutas `/api/prematricula`, `/api/talento` y `/api/donativos`. Para habilitar la recepción en producción, configure `SUPABASE_SERVICE_ROLE_KEY` en el servidor y cree estas tablas y el bucket privado `postulaciones` en el proyecto de Supabase asociado a `NEXT_PUBLIC_SUPABASE_URL`:

```sql
create table prematriculas (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  acudiente jsonb not null,
  estudiantes jsonb not null
);
create table intereses_donativos (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  modalidad text not null,
  nombre text not null,
  email text not null,
  telefono text not null,
  mensaje text not null default ''
);
create table postulaciones (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nombre text not null,
  email text not null,
  telefono text not null,
  especialidad text not null,
  cv_path text not null,
  carta_path text not null
);
insert into storage.buckets (id, name, public) values ('postulaciones', 'postulaciones', false);
```

El botón «Quiero aportar» registra interés en una modalidad y no procesa dinero. Para activar pagos se requiere una cuenta de ePayco, Wompi o Bold, sus credenciales de servidor, URL de retorno y webhook de confirmación. El webhook debe validar la firma y el estado del pago antes de registrar una donación como pagada. No use la clave pública del cliente como prueba de pago. Los datos y documentos de aspirantes contienen información personal; configure acceso administrativo restringido y una política de retención antes de lanzar los formularios.
