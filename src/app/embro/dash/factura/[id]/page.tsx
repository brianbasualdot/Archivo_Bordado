export default async function InvoicePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div className="min-h-screen bg-white p-8 flex flex-col items-center">
            <div className="w-full max-w-2xl border-4 border-black p-8 font-mono">

                {/* INVOICE HEADER */}
                <div className="border-b-4 border-black pb-8 mb-8 flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl font-black font-serif">ARCHIVO BORDADO</h1>
                        <p className="text-sm mt-2">Av. Corrientes 1234, CABA</p>
                        <p className="text-sm">CUIT: 20-33445566-7</p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-2xl font-bold bg-black text-white px-4 py-1 inline-block">FACTURA B</h2>
                        <p className="text-xl mt-2 font-bold">#{id}</p>
                        <p className="text-sm">FECHA: {new Date().toLocaleDateString()}</p>
                    </div>
                </div>

                {/* BILL TO */}
                <div className="mb-8">
                    <h3 className="font-bold border-b-2 border-black mb-2">FACTURAR A:</h3>
                    <p>Cliente Final</p>
                    <p>Consumidor Final</p>
                </div>

                {/* ITEMS */}
                <table className="w-full mb-8 border-2 border-black">
                    <thead className="bg-gray-100 border-b-2 border-black">
                        <tr>
                            <th className="p-2 text-left border-r-2 border-black">DESCRIPCIÓN</th>
                            <th className="p-2 text-right">IMPORTE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-4 border-r-2 border-black">Servicio de Digitalización / Activos Digitales</td>
                            <td className="p-4 text-right">$4,500.00</td>
                        </tr>
                    </tbody>
                </table>

                {/* TOTAL */}
                <div className="flex justify-end">
                    <div className="w-1/2">
                        <div className="flex justify-between border-b border-black py-2">
                            <span>Subtotal</span>
                            <span>$4,500.00</span>
                        </div>
                        <div className="flex justify-between py-2 text-xl font-black">
                            <span>TOTAL</span>
                            <span>$4,500.00</span>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="mt-12 text-center text-xs text-gray-400 border-t border-gray-200 pt-4">
                    Comprobante generado electrónicamente. Validez interna para Archivo Bordado.
                </div>

            </div>
        </div>
    );
}
