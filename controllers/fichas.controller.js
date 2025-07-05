import { PrismaClient } from "../generated/prisma/client";
const prisma = new PrismaClient();

export const getFichas = async (req, res) => {
  try {
    let where = {};
    if (req.query?.activo) {
      where.activo = Boolean(req.query.activo);
    }
    if (req.query?.nro_pedido) {
      where.nro_pedido = {
        contains: req.query.nro_pedido,
      };
    }
    if (req.query?.voucher) {
      where.voucher = {
        contains: req.query.voucher,
      };
    }
    if (req.query?.estado) {
      where.estado = Number(req.query.estado);
    }
    if (req.query?.esCasaCentral) {
      where.esCasaCentral = Boolean(req.query.esCasaCentral);
    }
    if (req.query?.cliente) {
      where.idCliente = Number(req.query.cliente);
    }
    if (req.query?.sindicato) {
      where.idSindicato = Number(req.query.sindicato);
    }
    if (req.query?.delegacion) {
      where.idDelegacion = Number(req.query.delegacion);
    }
    if (req.query?.optica) {
      where.idOptica = Number(req.query.optica);
    }
    if (req.query?.armazon) {
      where.idArmazon = Number(req.query.armazon);
    }
    const fichas = await prisma.ficha.findMany({
      where,
    });
    res.json(fichas);
  } catch (error) {
    console.error("Error fetching fichas:", error);
    res.status(500).json({ error: "Error fetching fichas" });
  }
};

export const getFichaById = async (req, res) => {
  try {
    const { id } = req.params;
    const ficha = await prisma.ficha.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.json(ficha);
  } catch (error) {
    console.error("Error fetching ficha:", error);
    res.status(500).json({ error: "Error fetching ficha" });
  }
};

export const createFicha = async (req, res) => {
  try {
    const {
      nro_pedido,
      fecha,
      fechaEntrega,
      estado,
      esCasaCentral,
      voucher,
      activo,
      idCliente,
      idSindicato,
      idDelegacion,
      idOptica,
      idArmazon,
    } = req.body;
    const ficha = await prisma.ficha.create({
      data: {
        nro_pedido,
        fecha,
        fechaEntrega,
        estado: Number(estado),
        esCasaCentral: Boolean(esCasaCentral),
        voucher,
        activo: Boolean(activo),
        idCliente,
        idSindicato,
        idDelegacion,
        idOptica,
        idArmazon,
      },
    });
    res.json(ficha);
  } catch (error) {
    console.error("Error creating ficha:", error);
    res.status(500).json({ error: "Error creating ficha" });
  }
};

export const updateFicha = async (req, res) => {
  try {
    const {
      id,
      nro_pedido,
      fecha,
      fechaEntrega,
      estado,
      esCasaCentral,
      voucher,
      activo,
      idCliente,
      idSindicato,
      idDelegacion,
      idOptica,
      idArmazon,
    } = req.body;
    const ficha = await prisma.ficha.update({
      where: {
        id: Number(id),
      },
      data: {
        nro_pedido,
        fecha,
        fechaEntrega,
        estado: Number(estado),
        esCasaCentral: Boolean(esCasaCentral),
        voucher,
        activo: Boolean(activo),
        idCliente,
        idSindicato,
        idDelegacion,
        idOptica,
        idArmazon,
      },
    });
    res.json(ficha);
  } catch (error) {
    console.error("Error updating ficha:", error);
    res.status(500).json({ error: "Error updating ficha" });
  }
};

export const deleteFicha = async (req, res) => {
  try {
    const { id } = req.body;
    const ficha = await prisma.ficha.update({
      where: {
        id: Number(id),
      },
      data: {
        activo: false,
      },
    });
    res.json(ficha);
  } catch (error) {
    console.error("Error deleting ficha:", error);
    res.status(500).json({ error: "Error deleting ficha" });
  }
};

export const restoreFicha = async (req, res) => {
  try {
    const { id } = req.body;
    const ficha = await prisma.ficha.update({
      where: {
        id: Number(id),
      },
      data: {
        activo: true,
      },
    });
    res.json(ficha);
  } catch (error) {
    console.error("Error restoring ficha:", error);
    res.status(500).json({ error: "Error restoring ficha" });
  }
};
