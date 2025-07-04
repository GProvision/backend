-- CreateEnum
CREATE TYPE "TipoAccion" AS ENUM ('CREAR', 'ACTUALIZAR', 'ELIMINAR');

-- CreateEnum
CREATE TYPE "TipoRecurso" AS ENUM ('CLIENTE', 'OPTICA', 'USUARIO', 'FICHA', 'TIPO_LENTE', 'ARMAZON', 'DELEGACION', 'SINDICATO');

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "titular" TEXT NOT NULL,
    "beneficiario" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "nroAfiliado" TEXT NOT NULL,
    "idSindicato" INTEGER NOT NULL,
    "contacto" JSON,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sindicato" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Sindicato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delegacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Delegacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Optica" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Optica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoLente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "TipoLente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Laboratorio" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Laboratorio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Armazon" (
    "id" SERIAL NOT NULL,
    "material" TEXT NOT NULL,
    "tipoArmazon" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "codigoColor" TEXT NOT NULL,
    "codigoInterno" TEXT NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 0,
    "cantidadMinima" INTEGER NOT NULL DEFAULT 2,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "costo" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "precioVenta" DECIMAL(10,2) NOT NULL DEFAULT 0.00,

    CONSTRAINT "Armazon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ficha" (
    "id" SERIAL NOT NULL,
    "nro_pedido" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "estado" INTEGER NOT NULL DEFAULT 1,
    "esCasaCentral" BOOLEAN NOT NULL DEFAULT false,
    "voucher" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "idCliente" INTEGER NOT NULL,
    "idSindicato" INTEGER NOT NULL,
    "idDelegacion" INTEGER NOT NULL,
    "idOptica" INTEGER NOT NULL,
    "idArmazon" INTEGER NOT NULL,

    CONSTRAINT "Ficha_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lente" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "extra" JSON,
    "gradOdEsf" TEXT,
    "gradOdCil" TEXT,
    "ejeOd" TEXT,
    "gradOiEsf" TEXT,
    "gradOiCil" TEXT,
    "ejeOi" TEXT,
    "idLaboratorio" INTEGER,
    "idTipoLente" INTEGER,

    CONSTRAINT "Lente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rol" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,

    CONSTRAINT "Rol_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "usuario" TEXT NOT NULL,
    "token" TEXT,
    "rolId" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accion" (
    "id" SERIAL NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accion" "TipoAccion" NOT NULL,
    "recurso" "TipoRecurso" NOT NULL,
    "recursoId" INTEGER,

    CONSTRAINT "Accion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DelegacionToSindicato" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DelegacionToSindicato_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_OpticaToSindicato" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_OpticaToSindicato_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FichaToLente" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FichaToLente_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_beneficiario_key" ON "Cliente"("beneficiario");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_dni_key" ON "Cliente"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_nroAfiliado_key" ON "Cliente"("nroAfiliado");

-- CreateIndex
CREATE INDEX "Cliente_beneficiario_dni_nroAfiliado_idx" ON "Cliente"("beneficiario", "dni", "nroAfiliado");

-- CreateIndex
CREATE UNIQUE INDEX "Sindicato_nombre_key" ON "Sindicato"("nombre");

-- CreateIndex
CREATE INDEX "Sindicato_nombre_idx" ON "Sindicato"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Delegacion_nombre_key" ON "Delegacion"("nombre");

-- CreateIndex
CREATE INDEX "Delegacion_nombre_idx" ON "Delegacion"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Optica_nombre_key" ON "Optica"("nombre");

-- CreateIndex
CREATE INDEX "Optica_nombre_idx" ON "Optica"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "TipoLente_nombre_key" ON "TipoLente"("nombre");

-- CreateIndex
CREATE INDEX "TipoLente_nombre_idx" ON "TipoLente"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Laboratorio_nombre_key" ON "Laboratorio"("nombre");

-- CreateIndex
CREATE INDEX "Laboratorio_nombre_idx" ON "Laboratorio"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "Armazon_codigoInterno_key" ON "Armazon"("codigoInterno");

-- CreateIndex
CREATE INDEX "Armazon_codigoInterno_idx" ON "Armazon"("codigoInterno");

-- CreateIndex
CREATE INDEX "Ficha_nro_pedido_voucher_idx" ON "Ficha"("nro_pedido", "voucher");

-- CreateIndex
CREATE INDEX "Lente_gradOdEsf_gradOdCil_ejeOd_gradOiEsf_gradOiCil_ejeOi_idx" ON "Lente"("gradOdEsf", "gradOdCil", "ejeOd", "gradOiEsf", "gradOiCil", "ejeOi");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_usuario_key" ON "Usuario"("usuario");

-- CreateIndex
CREATE INDEX "Usuario_usuario_nombre_idx" ON "Usuario"("usuario", "nombre");

-- CreateIndex
CREATE INDEX "Accion_accion_recurso_idx" ON "Accion"("accion", "recurso");

-- CreateIndex
CREATE INDEX "_DelegacionToSindicato_B_index" ON "_DelegacionToSindicato"("B");

-- CreateIndex
CREATE INDEX "_OpticaToSindicato_B_index" ON "_OpticaToSindicato"("B");

-- CreateIndex
CREATE INDEX "_FichaToLente_B_index" ON "_FichaToLente"("B");

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_idSindicato_fkey" FOREIGN KEY ("idSindicato") REFERENCES "Sindicato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ficha" ADD CONSTRAINT "Ficha_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ficha" ADD CONSTRAINT "Ficha_idOptica_fkey" FOREIGN KEY ("idOptica") REFERENCES "Optica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ficha" ADD CONSTRAINT "Ficha_idArmazon_fkey" FOREIGN KEY ("idArmazon") REFERENCES "Armazon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ficha" ADD CONSTRAINT "Ficha_idSindicato_fkey" FOREIGN KEY ("idSindicato") REFERENCES "Sindicato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ficha" ADD CONSTRAINT "Ficha_idDelegacion_fkey" FOREIGN KEY ("idDelegacion") REFERENCES "Delegacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lente" ADD CONSTRAINT "Lente_idLaboratorio_fkey" FOREIGN KEY ("idLaboratorio") REFERENCES "Laboratorio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lente" ADD CONSTRAINT "Lente_idTipoLente_fkey" FOREIGN KEY ("idTipoLente") REFERENCES "TipoLente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accion" ADD CONSTRAINT "Accion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DelegacionToSindicato" ADD CONSTRAINT "_DelegacionToSindicato_A_fkey" FOREIGN KEY ("A") REFERENCES "Delegacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DelegacionToSindicato" ADD CONSTRAINT "_DelegacionToSindicato_B_fkey" FOREIGN KEY ("B") REFERENCES "Sindicato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OpticaToSindicato" ADD CONSTRAINT "_OpticaToSindicato_A_fkey" FOREIGN KEY ("A") REFERENCES "Optica"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OpticaToSindicato" ADD CONSTRAINT "_OpticaToSindicato_B_fkey" FOREIGN KEY ("B") REFERENCES "Sindicato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FichaToLente" ADD CONSTRAINT "_FichaToLente_A_fkey" FOREIGN KEY ("A") REFERENCES "Ficha"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FichaToLente" ADD CONSTRAINT "_FichaToLente_B_fkey" FOREIGN KEY ("B") REFERENCES "Lente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
