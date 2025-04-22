"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CheckoutFormClient({ monto }) {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    ciudad: "",
    direccion: "",
    metodoEnvio: "envio",
    metodoPago: "wompi",
  });

  useEffect(() => {
    console.log("✅ Componente cargado en cliente");
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("http://localhost:3000/create-transaction", {
        ...form,
        monto,
      });

      console.log("💬 Respuesta completa del backend:", data);

      if (!data || !data.orden || !data.orden.id) {
        console.error("❌ ERROR: La respuesta no contiene una orden válida:", data);
        alert("Ocurrió un error inesperado al crear la orden.");
        return;
      }

      const orden = data.orden;
      console.log("✅ ID de la orden:", orden.id);

      const url = new URL("https://checkout.wompi.co/p/");
      url.searchParams.set("public-key", import.meta.env.PUBLIC_WOMPI_PUBLIC_KEY);
      url.searchParams.set("currency", "COP");
      url.searchParams.set("amount-in-cents", monto * 100);
      url.searchParams.set("reference", orden.id.toString());
      url.searchParams.set("redirect-url", import.meta.env.PUBLIC_WOMPI_REDIRECT_URL);

      window.location.href = url.toString();
    } catch (err) {
      console.error("❌ Error creando transacción:", err);
      alert("Ocurrió un error al procesar el pago.");
    }
  };

  return (
    <section className="bg-[#0f0f0f] text-white min-h-screen flex items-center justify-center px-4 py-16">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black shadow-xl rounded-2xl p-8 w-full max-w-2xl space-y-6"
      >
        <div className="flex justify-center">
          <img src="/images/LOGOMASTERBAGnegro.png" alt="Masterbag" className="h-12" />
        </div>

        <h2 className="text-2xl font-bold text-center">Finaliza tu compra</h2>
        <p className="text-center text-gray-500 -mt-4">Estás a un paso de viajar con estilo 🏍️</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" name="nombre" placeholder="Nombre completo" value={form.nombre} onChange={handleChange} required className="input" />
          <input type="email" name="correo" placeholder="Correo electrónico" value={form.correo} onChange={handleChange} required className="input" />
          <input type="tel" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required className="input" />
          <input type="text" name="ciudad" placeholder="Ciudad" value={form.ciudad} onChange={handleChange} required className="input" />
          <input type="text" name="direccion" placeholder="Dirección de entrega" value={form.direccion} onChange={handleChange} required className="input md:col-span-2" />
        </div>

        <div className="space-y-2">
          <p className="font-semibold">¿Cómo te gustaría recibir tu pedido?</p>
          <div className="flex gap-4 flex-wrap">
            <label className={`radio-option ${form.metodoEnvio === "envio" ? "selected" : ""}`}>
              <input type="radio" name="metodoEnvio" value="envio" checked={form.metodoEnvio === "envio"} onChange={handleChange} className="hidden" />
              🚚 Envío
            </label>
            <label className={`radio-option ${form.metodoEnvio === "retiro" ? "selected" : ""}`}>
              <input type="radio" name="metodoEnvio" value="retiro" checked={form.metodoEnvio === "retiro"} onChange={handleChange} className="hidden" />
              🏬 Retiro en tienda
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <p className="font-semibold">Escoge el medio de pago que prefieras:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className={`radio-option ${form.metodoPago === "wompi" ? "selected" : ""}`}>
              <input type="radio" name="metodoPago" value="wompi" checked={form.metodoPago === "wompi"} onChange={handleChange} className="hidden" />
              <img src="/images/Wompi_LogoPrincipal.png" alt="Wompi" className="h-10 mx-auto" />
            </label>
            <label className={`radio-option ${form.metodoPago === "nequi" ? "selected" : ""}`}>
              <input type="radio" name="metodoPago" value="nequi" checked={form.metodoPago === "nequi"} onChange={handleChange} className="hidden" />
              <img src="/images/nequi.svg" alt="Nequi" className="h-10 mx-auto" />
            </label>
            <label className={`radio-option ${form.metodoPago === "payu" ? "selected" : ""}`}>
              <input type="radio" name="metodoPago" value="payu" checked={form.metodoPago === "payu"} onChange={handleChange} className="hidden" />
              <img src="/images/tarjetas.png" alt="PayU" className="h-10 mx-auto" />
            </label>
          </div>
        </div>

        <button type="submit" className="bg-[#caa64f] text-black font-bold py-3 rounded-lg w-full transition hover:opacity-90">
          Ir al pago
        </button>
      </form>
    </section>
  );
}
