const { PrismaClient } = require("../generated/prisma");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function loadJsonData(filename) {
  try {
    const filePath = path.join(__dirname, "..", "data", filename);
    if (!fs.existsSync(filePath)) {
      console.error(`File ${filename} not found.`);
      process.exit(1);
    }
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error loading ${filename}:`, error);
    process.exit(1);
  }
}

async function seedDatabase() {
  console.log("Starting database seeding...");

  // Clear existing data (be careful with this in production!)
  console.log("Clearing existing data...");
  await prisma.accion.deleteMany({});
  await prisma.ficha.deleteMany({});
  await prisma.cliente.deleteMany({});
  await prisma.armazon.deleteMany({});
  await prisma.tipoLente.deleteMany({});
  await prisma.sindicato.deleteMany({});
  await prisma.optica.deleteMany({});
  await prisma.delegacion.deleteMany({});
  await prisma.usuario.deleteMany({});
  await prisma.rol.deleteMany({});

  console.log("Seeding roles...");
  const roles = await loadJsonData("roles.json");
  for (const rol of roles) {
    await prisma.rol.create({
      data: {
        nombre: rol.descripcion,
      },
    });
  }

  console.log("Seeding delegaciones...");
  const delegaciones = await loadJsonData("delegacion.json");
  for (const delegacion of delegaciones) {
    await prisma.delegacion.create({
      data: {
        nombre: delegacion.descripcion,
        activo:
          delegacion.activo !== undefined ? Boolean(delegacion.activo) : true,
      },
    });
  }

  console.log("Seeding ópticas...");
  const opticas = await loadJsonData("opticas.json");
  for (const optica of opticas) {
    const delegacion = await prisma.delegacion.findFirst({
      where: {
        nombre: optica?.delegacion?.descripcion,
      },
    });
    await prisma.optica.create({
      data: {
        nombre: optica.optica,
        delegacionId: delegacion?.id,
        activo: optica.activo !== undefined ? Boolean(optica.activo) : true,
      },
    });
  }

  console.log("Seeding sindicatos...");
  const sindicatos = await loadJsonData("sindicatos.json");
  for (const sindicato of sindicatos) {
    await prisma.sindicato.create({
      data: {
        nombre: sindicato.descripcion,
        activo:
          sindicato.activo !== undefined ? Boolean(sindicato.activo) : true,
      },
    });
  }

  console.log("Seeding tipos de lentes...");
  const tiposLentes = await loadJsonData("tipoLentes.json");
  for (const tipo of tiposLentes) {
    await prisma.tipoLente.create({
      data: {
        nombre: tipo.descripcion,
        activo: tipo.activo !== undefined ? Boolean(tipo.activo) : true,
      },
    });
  }

  console.log("Seeding armazones...");
  const armazones = await loadJsonData("stock.json");
  for (const armazon of armazones) {
    await prisma.armazon.create({
      data: {
        material: armazon.material || "",
        tipoArmazon: armazon.tipo_armazon || "",
        ubicacion: armazon.ubicacion || "",
        codigoColor: armazon.codigo_color || "",
        descripcionColor: armazon.descripcion_color || "",
        nroCodigoInterno: armazon.nro_codigo_interno || "",
        letraColorInterno: armazon.letra_color_interno || "",
        cantidad: 10,
        cantidadMinima: 2,
        costo: armazon.costo || 0,
        precioVenta: armazon.precio_venta || 0,
        activo: armazon.activo !== undefined ? Boolean(armazon.activo) : true,
      },
    });
  }

  console.log("Seeding clientes...");
  const clientes = await loadJsonData("clientes.json");
  for (const cliente of clientes) {
    const sindicato = await prisma.sindicato.findFirst({
      where: {
        nombre: cliente?.sindicato?.descripcion,
      },
    });
    await prisma.cliente.create({
      data: {
        titular: cliente.titular_cliente || "",
        beneficiario: cliente.beneficiario_cliente || "",
        dni: cliente.dni_cliente || "",
        nroAfiliado: cliente.nro_afiliado_cliente || "",
        contacto: {},
        idSindicato: sindicato?.id,
        activo: cliente.activo !== undefined ? Boolean(cliente.activo) : true,
      },
    });
  }

  console.log("Seeding usuarios...");
  const usuarios = await loadJsonData("usuarios.json");
  for (const usuario of usuarios) {
    const rol = await prisma.rol.findFirst({
      where: {
        nombre: usuario?.rol?.descripcion,
      },
    });
    await prisma.usuario.create({
      data: {
        nombre: `${usuario.nombre} ${usuario.apellido}`,
        clave: bcrypt.hashSync(String(usuario.user_name).toLowerCase(), 10),
        usuario: String(usuario.user_name).toLowerCase(),
        rolId: rol?.id,
        activo: usuario.activo !== undefined ? Boolean(usuario.activo) : true,
      },
    });
  }

  console.log("Seeding fichas...");
  const fichas = await loadJsonData("fichas.json");
  for (const ficha of fichas) {
    const cliente = await prisma.cliente.findFirst({
      where: {
        beneficiario: ficha?.cliente?.beneficiario_cliente,
      },
    });
    const optica = await prisma.optica.findFirst({
      where: {
        nombre: ficha?.optica?.optica,
      },
    });
    const tipoLente = await prisma.tipoLente.findFirst({
      where: {
        nombre: ficha?.tipo_lente?.descripcion,
      },
    });
    const armazon = await prisma.armazon.findFirst({
      where: {
        nroCodigoInterno: ficha?.stock?.nroCodigoInterno,
      },
    });
    const sindicato = await prisma.sindicato.findFirst({
      where: {
        nombre: ficha?.cliente?.sindicato?.descripcion,
      },
    });
    const delegacion = await prisma.delegacion.findFirst({
      where: {
        nombre: ficha?.optica?.delegacion?.descripcion,
      },
    });
    await prisma.ficha.create({
      data: {
        nro_pedido: ficha.nro_pedido || "",
        fecha: ficha.fecha ? new Date(ficha.fecha) : new Date(),
        estado: Number(ficha.estado) || 1,
        gradOdEsf: ficha.grad_od_esf || null,
        gradOdCil: ficha.grad_od_cil || null,
        ejeOd: ficha.eje_od || null,
        gradOiEsf: ficha.grad_oi_esf || null,
        gradOiCil: ficha.grad_oi_cil || null,
        ejeOi: ficha.eje_oi || null,
        esCasaCentral: ficha.es_casa_central || 0,
        voucher: ficha.voucher || "",
        codigoArmazon: ficha.codigo_armazon || "",
        colorArmazon: ficha.color_armazon || "",
        idTipoLente: tipoLente?.id,
        idCliente: cliente?.id,
        idSindicato: sindicato?.id,
        idDelegacion: delegacion?.id,
        idOptica: optica?.id,
        idArmazon: armazon?.id,
        activo: ficha.activo !== undefined ? Boolean(ficha.activo) : true,
      },
    });
  }

  console.log("Database seeded successfully!");
}

seedDatabase()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
