# Recepción de formularios

Los formularios de prematrícula, donativos y trabajo con nosotros llegan a **nuevoscomienzosco@gmail.com** mediante Resend. Cada modalidad tiene una plantilla HTML con los colores de Nuevos Comienzos College, una versión de texto y un botón para responder al contacto. Las postulaciones incluyen la hoja de vida y la carta pastoral como adjuntos. Cada documento puede pesar hasta 2 MB; el total queda por debajo del límite de 4,5 MB de las funciones de Vercel. La respuesta de éxito del sitio significa que Resend aceptó el correo; la entrega final depende del proveedor y de Gmail.

## Activar con Hostinger y Vercel

La forma más directa con el buzón facilitado por el colegio es SMTP de Hostinger. **La contraseña mostrada en una captura o mensaje debe cambiarse antes de usarla.** Puede hacerse en Hostinger → Emails → Mailboxes → menú de la cuenta → Change Password. La nueva contraseña se introduce únicamente como variable privada en Vercel, nunca en Git, WhatsApp ni en el chat.

En Vercel → proyecto → Settings → Environment Variables, configure para **Production**:

```env
HOSTINGER_SMTP_USER=info@nuevoscomienzosco.com
HOSTINGER_SMTP_PASSWORD=<nueva contraseña del buzón>
```

El servidor usa `smtp.hostinger.com` por SSL en el puerto 465 y envía desde esa dirección al Gmail fijado en `lib/form-email.ts`. No hace falta una clave de Resend para esta vía. Guarde las variables y despliegue una versión nueva del proyecto para que Vercel las aplique. Haga pruebas de los tres formularios, revise la bandeja de Gmail y la carpeta de spam y compruebe los dos adjuntos del formulario de empleo.

No configure solo una de estas variables. Si se configuran tanto Hostinger como Resend, Hostinger tiene prioridad.

## Resend como alternativa

Si prefieren usar Resend, dejen sin configurar las variables `HOSTINGER_SMTP_*`, verifiquen un [dominio propio en Resend](https://resend.com/docs/dashboard/domains/introduction) y añadan al servidor:

```env
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=Nuevos Comienzos College <formularios@dominio-verificado-del-colegio.com>
```

La clave y la contraseña son privadas; no deben llevar el prefijo `NEXT_PUBLIC_`. El destinatario no se toma de los formularios públicos.

Las rutas son `/api/prematricula`, `/api/talento` y `/api/donativos`. Si el envío falla, la página muestra un error y conserva los datos para reintentar. La API limita tamaños, valida campos y documentos y escapa el contenido del HTML. En Resend las solicitudes idénticas usan una clave de idempotencia durante 24 horas.

## Respaldo opcional en Supabase

El correo es el canal principal. Si se configura `SUPABASE_SERVICE_ROLE_KEY` en el servidor y se crean las tablas siguientes y el bucket privado `postulaciones` en el proyecto asociado a `NEXT_PUBLIC_SUPABASE_URL`, el sistema también guarda una copia. Si el respaldo falla después de que Resend acepte el mensaje, se informa en el log del servidor y no se vuelve a enviar el correo.

```sql
create table prematriculas (
  id uuid primary key,
  created_at timestamptz not null default now(),
  acudiente jsonb not null,
  estudiantes jsonb not null
);
create table intereses_donativos (
  id uuid primary key,
  created_at timestamptz not null default now(),
  modalidad text not null,
  nombre text not null,
  email text not null,
  telefono text not null,
  mensaje text not null default ''
);
create table postulaciones (
  id uuid primary key,
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

Si las tablas ya existen con `id uuid primary key default gen_random_uuid()`, se pueden conservar: el sistema envía el ID de Resend al guardar una copia. Restrinja el acceso administrativo a los documentos y establezca una política de retención para los datos personales.

## Donativos en línea

«Quiero aportar» registra interés y permite coordinar el aporte por correo; no cobra dinero. Para activar pagos se requiere una cuenta de ePayco, Wompi o Bold, sus credenciales de servidor, URL de retorno y webhook de confirmación. El webhook debe validar la firma y el estado del pago antes de registrar una donación como pagada.
