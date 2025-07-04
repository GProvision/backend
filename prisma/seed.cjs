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
  let roles = await loadJsonData("roles.json");
  roles = roles.map((rol) => {
    return {
      nombre: rol.descripcion,
    };
  });

  roles = roles.filter(
    (rol, index) => roles.findIndex((r) => r.nombre === rol.nombre) === index
  );

  for (const rol of roles) {
    await prisma.rol.create({
      data: rol,
    });
  }

  console.log("Seeding delegaciones...");
  let delegaciones = await loadJsonData("delegacion.json");
  delegaciones = delegaciones.map((delegacion) => {
    return {
      nombre: delegacion.descripcion,
    };
  });

  delegaciones = delegaciones.filter(
    (delegacion, index) =>
      delegaciones.findIndex((d) => d.nombre === delegacion.nombre) === index
  );

  for (const delegacion of delegaciones) {
    await prisma.delegacion.create({
      data: delegacion,
    });
  }

  console.log("Seeding ópticas...");
  let opticas = await loadJsonData("opticas.json");
  opticas = opticas.map((optica) => {
    return {
      nombre: optica.optica,
    };
  });

  opticas = opticas.filter(
    (optica, index) =>
      opticas.findIndex((o) => o.nombre === optica.nombre) === index
  );

  for (const optica of opticas) {
    await prisma.optica.create({
      data: optica,
    });
  }

  console.log("Seeding sindicatos...");
  let sindicatos = await loadJsonData("sindicatos.json");
  sindicatos = sindicatos.map((sindicato) => {
    return {
      nombre: sindicato.descripcion,
    };
  });

  sindicatos = sindicatos.filter(
    (sindicato, index) =>
      sindicatos.findIndex((s) => s.nombre === sindicato.nombre) === index
  );

  for (const sindicato of sindicatos) {
    await prisma.sindicato.create({
      data: sindicato,
    });
  }

  console.log("Seeding tipos de lentes...");
  let tiposLentes = await loadJsonData("tipoLentes.json");
  tiposLentes = tiposLentes.map((tipo) => {
    return {
      nombre: tipo.descripcion,
    };
  });

  tiposLentes = tiposLentes.filter(
    (tipo, index) =>
      tiposLentes.findIndex((t) => t.nombre === tipo.nombre) === index
  );

  for (const tipo of tiposLentes) {
    await prisma.tipoLente.create({
      data: tipo,
    });
  }

  console.log("Seeding armazones...");
  let armazones = await loadJsonData("armazones.json");

  for (const armazon of armazones) {
    await prisma.armazon.create({
      data: armazon,
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
