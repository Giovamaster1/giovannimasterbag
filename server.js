import express from "express";
import fs from "fs";
import cors from "cors";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

// 🧠 Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = 3000;
const ORDERS_FILE = "./orders.json";

app.use(cors());
app.use(bodyParser.json());

/**
 * Crear orden nueva desde formulario
 */
app.post("/create-transaction", async (req, res) => {
  try {
    console.log("🧾 Recibido desde el frontend:", req.body);
    const { nombre, correo, telefono, ciudad, direccion, metodoEnvio, metodoPago, monto } = req.body;

    if (!nombre || !correo || !telefono) {
      return res.status(400).json({ error: "Faltan datos del formulario" });
    }

    const montoBase = req.body.monto || 349900;
    const costoEnvio = metodoEnvio === "envio" ? 19900 : 0;
    const montoFinal = (montoBase + costoEnvio) * 100;

    const nuevaOrden = {
      id: uuidv4(),
      nombre,
      correo,
      telefono,
      ciudad,
      direccion,
      metodoEnvio,
      metodoPago,
      monto: montoFinal,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    let ordenes = [];
    if (fs.existsSync(ORDERS_FILE)) {
      ordenes = JSON.parse(fs.readFileSync(ORDERS_FILE));
    }

    ordenes.push(nuevaOrden);
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(ordenes, null, 2));
    console.log("🧾 Orden enviada al frontend:", nuevaOrden);
    res.status(200).json({ message: "Orden creada ✅", orden: nuevaOrden });
  } catch (err) {
    console.error("❌ Error creando orden:", err.message);
    res.status(500).json({ error: "Error interno al crear orden" });
  }
});

/**
 * Redirección a Wompi
 */
app.get("/redirect-to-wompi/:id", (req, res) => {
  const orderId = req.params.id;

  if (!fs.existsSync(ORDERS_FILE)) return res.status(404).send("Archivo de órdenes no encontrado");

  const orders = JSON.parse(fs.readFileSync(ORDERS_FILE));
  const order = orders.find((o) => o.id === orderId);

  if (!order) return res.status(404).send("Orden no encontrada");

  const wompiUrl = new URL("https://sandbox.wompi.co/p/");
  wompiUrl.searchParams.set("public-key", process.env.PUBLIC_WOMPI_PUBLIC_KEY);
  wompiUrl.searchParams.set("currency", "COP");
  wompiUrl.searchParams.set("amount-in-cents", order.monto);
  wompiUrl.searchParams.set("reference", order.id);
  wompiUrl.searchParams.set("redirect-url", process.env.WOMPI_REDIRECT_URL);

  console.log("🔗 URL a Wompi:", wompiUrl.toString());
  res.redirect(wompiUrl.toString());
});

/**
 * Webhook
 */
app.post("/webhook", (req, res) => {
  const { data } = req.body;
  const { reference, status } = data.transaction;

  if (!fs.existsSync(ORDERS_FILE)) return res.sendStatus(200);

  const ordenes = JSON.parse(fs.readFileSync(ORDERS_FILE));
  const index = ordenes.findIndex((o) => o.id === reference);

  if (index !== -1) {
    ordenes[index].status = status;
    ordenes[index].updated_at = new Date().toISOString();
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(ordenes, null, 2));
  }

  res.sendStatus(200);
});

/**
 * Iniciar backend
 */
app.listen(PORT, () => {
  console.clear();
  console.log(`✅ Backend escuchando en http://localhost:${PORT}`);
});
