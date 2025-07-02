-- CreateEnum
CREATE TYPE "TipoAccion" AS ENUM ('CREAR', 'LEER', 'ACTUALIZAR', 'ELIMINAR');

-- CreateEnum
CREATE TYPE "TipoRecurso" AS ENUM ('CLIENTE', 'OPTICA', 'FICHA', 'STOCK', 'USUARIO');

-- CreateTable
CREATE TABLE "Cliente" (
    "id" SERIAL NOT NULL,
    "titular" TEXT NOT NULL,
    "beneficiario" TEXT NOT NULL,
    "dni" TEXT,
    "nroAfiliado" TEXT NOT NULL,
    "idSindicato" INTEGER NOT NULL,
    "contacto" JSON,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Optica" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "delegacionId" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Optica_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delegacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Delegacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sindicato" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Sindicato_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TipoLente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "TipoLente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Armazon" (
    "id" SERIAL NOT NULL,
    "cantidad" INTEGER NOT NULL DEFAULT 0,
    "material" TEXT NOT NULL,
    "tipoArmazon" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "codigoColor" TEXT NOT NULL,
    "descripcionColor" TEXT NOT NULL,
    "nroCodigoInterno" TEXT NOT NULL,
    "letraColorInterno" TEXT NOT NULL,
    "cantidadMinima" INTEGER NOT NULL DEFAULT 0,
    "costo" DECIMAL(10,2) NOT NULL,
    "precioVenta" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Armazon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ficha" (
    "id" SERIAL NOT NULL,
    "nro_pedido" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "estado" INTEGER NOT NULL DEFAULT 1,
    "gradOdEsf" TEXT,
    "gradOdCil" TEXT,
    "ejeOd" TEXT,
    "gradOiEsf" TEXT,
    "gradOiCil" TEXT,
    "ejeOi" TEXT,
    "esCasaCentral" INTEGER NOT NULL,
    "voucher" TEXT NOT NULL,
    "codigoArmazon" TEXT NOT NULL,
    "colorArmazon" TEXT NOT NULL,
    "idTipoLente" INTEGER NOT NULL,
    "idCliente" INTEGER NOT NULL,
    "idSindicato" INTEGER NOT NULL,
    "idDelegacion" INTEGER NOT NULL,
    "idOptica" INTEGER NOT NULL,
    "idArmazon" INTEGER NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Ficha_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "_OpticaToSindicato" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_OpticaToSindicato_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_DelegacionToSindicato" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_DelegacionToSindicato_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_usuario_key" ON "Usuario"("usuario");

-- CreateIndex
CREATE INDEX "_OpticaToSindicato_B_index" ON "_OpticaToSindicato"("B");

-- CreateIndex
CREATE INDEX "_DelegacionToSindicato_B_index" ON "_DelegacionToSindicato"("B");

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_idSindicato_fkey" FOREIGN KEY ("idSindicato") REFERENCES "Sindicato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Optica" ADD CONSTRAINT "Optica_delegacionId_fkey" FOREIGN KEY ("delegacionId") REFERENCES "Delegacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ficha" ADD CONSTRAINT "Ficha_idCliente_fkey" FOREIGN KEY ("idCliente") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ficha" ADD CONSTRAINT "Ficha_idOptica_fkey" FOREIGN KEY ("idOptica") REFERENCES "Optica"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ficha" ADD CONSTRAINT "Ficha_idArmazon_fkey" FOREIGN KEY ("idArmazon") REFERENCES "Armazon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ficha" ADD CONSTRAINT "Ficha_idTipoLente_fkey" FOREIGN KEY ("idTipoLente") REFERENCES "TipoLente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ficha" ADD CONSTRAINT "Ficha_idSindicato_fkey" FOREIGN KEY ("idSindicato") REFERENCES "Sindicato"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ficha" ADD CONSTRAINT "Ficha_idDelegacion_fkey" FOREIGN KEY ("idDelegacion") REFERENCES "Delegacion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_rolId_fkey" FOREIGN KEY ("rolId") REFERENCES "Rol"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accion" ADD CONSTRAINT "Accion_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OpticaToSindicato" ADD CONSTRAINT "_OpticaToSindicato_A_fkey" FOREIGN KEY ("A") REFERENCES "Optica"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OpticaToSindicato" ADD CONSTRAINT "_OpticaToSindicato_B_fkey" FOREIGN KEY ("B") REFERENCES "Sindicato"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DelegacionToSindicato" ADD CONSTRAINT "_DelegacionToSindicato_A_fkey" FOREIGN KEY ("A") REFERENCES "Delegacion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DelegacionToSindicato" ADD CONSTRAINT "_DelegacionToSindicato_B_fkey" FOREIGN KEY ("B") REFERENCES "Sindicato"("id") ON DELETE CASCADE ON UPDATE CASCADE;
