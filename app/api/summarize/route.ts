import { NextRequest, NextResponse } from 'next/server';
import pdf from 'pdf-parse';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        // @ts-ignore - pdf-parse types can be finicky
        const data = await pdf(buffer);
        const text = data.text;
        console.log(`Extracted text length: ${text?.length}`);


        // Validar si realmente hay texto útil
        if (!text || text.trim().length < 50) {
            return NextResponse.json({
                error: 'No se pudo extraer suficiente texto del PDF. Asegúrate de que no sea una imagen escaneada.'
            }, { status: 400 });
        }

        const models = [
            'google/gemini-2.0-flash-exp:free',
            'meta-llama/llama-3.2-3b-instruct:free',
            'mistralai/mistral-7b-instruct:free',
            'liquid/lfm-40b:free',
            'huggingfaceh4/zephyr-7b-beta:free',
            'openchat/openchat-7b:free',
            'gryphe/mythomax-l2-13b:free'
        ];

        let lastError = "";

        for (const model of models) {
            console.log(`Trying model: ${model}...`);
            try {
                const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                        'Content-Type': 'application/json',
                        'HTTP-Referer': 'http://localhost:3000',
                        'X-Title': 'PDF Summarizer',
                    },
                    body: JSON.stringify({
                        model: model,
                        messages: [
                            {
                                role: 'system',
                                content: 'Eres un asistente útil que resume documentos PDF. Proporciona un resumen completo y detallado del texto, SIEMPRE EN ESPAÑOL. Usa formato markdown para mejorar la legibilidad (títulos, viñetas, negrita).',
                            },
                            {
                                role: 'user',
                                content: text.substring(0, 30000),
                            },
                        ],
                    }),
                });

                if (response.ok) {
                    const json = await response.json();
                    const summary = json.choices?.[0]?.message?.content;

                    if (summary && summary.length > 20) {
                        console.log(`Success with model: ${model}`);
                        return NextResponse.json({ summary });
                    }
                } else {
                    const errorText = await response.text();
                    lastError = `${response.status} - ${errorText}`;
                    console.warn(`Failed with model ${model}: ${lastError}`);
                }
            } catch (err) {
                console.error(`Exception with model ${model}:`, err);
            }
        }

        console.error("All models failed. Last error:", lastError);

        // Mensaje específico si es por saturación
        if (lastError.includes("429")) {
            return NextResponse.json({
                error: 'Los servicios de IA gratuitos están saturados momentáneamente. Por favor espera 1 minuto e inténtalo de nuevo.'
            }, { status: 503 });
        }

        return NextResponse.json({
            error: 'No se pudo generar el resumen con ningún modelo disponible. Intenta más tarde.'
        }, { status: 503 });

    } catch (error) {
        console.error('Error processing PDF:', error);
        return NextResponse.json({ error: 'Error interno del servidor al procesar el archivo.' }, { status: 500 });
    }
}
