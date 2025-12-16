"use client";

import { useState } from "react";
import { Upload, FileText, Loader2, Sparkles } from "lucide-react";
import clsx from "clsx";

export default function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [summary, setSummary] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setSummary(null);
            setError(null);
        }
    };

    const handleSummarize = async () => {
        if (!file) return;

        setLoading(true);
        setError(null);
        setSummary(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/summarize", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Error al resumir el PDF");
            }

            const data = await res.json();
            setSummary(data.summary);
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Ocurrió un error inesperado.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 md:p-24 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            <div className="z-10 w-full max-w-2xl">
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full backdrop-blur-md mb-4 ring-1 ring-white/20">
                        <Sparkles className="w-6 h-6 text-purple-300" />
                    </div>
                    <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-blue-200">
                        Resumidor de PDF
                    </h1>
                    <p className="text-lg text-gray-300 max-w-md mx-auto">
                        Sube cualquier PDF y obtén un resumen instantáneo impulsado por IA.
                    </p>
                </div>

                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl ring-1 ring-white/5 mx-auto transition-all duration-300 hover:bg-white/10">
                    <div className="space-y-6">
                        <label
                            htmlFor="dropzone-file"
                            className={clsx(
                                "flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 group",
                                file
                                    ? "border-green-400 bg-green-400/5"
                                    : "border-gray-600 hover:border-purple-400 hover:bg-purple-400/5"
                            )}
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                                {file ? (
                                    <>
                                        <FileText className="w-12 h-12 mb-4 text-green-400" />
                                        <p className="mb-2 text-sm text-green-200 font-semibold">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-green-200/60">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="w-12 h-12 mb-4 text-gray-400 group-hover:text-purple-300 transition-colors" />
                                        <p className="mb-2 text-sm text-gray-300">
                                            <span className="font-semibold text-purple-300">
                                                Haz clic para subir
                                            </span>{" "}
                                            o arrastra y suelta
                                        </p>
                                        <p className="text-xs text-gray-500">Solo archivos PDF</p>
                                    </>
                                )}
                            </div>
                            <input
                                id="dropzone-file"
                                type="file"
                                accept=".pdf"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>

                        <button
                            onClick={handleSummarize}
                            disabled={!file || loading}
                            className={clsx(
                                "w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2",
                                !file
                                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                                    : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-0.5 active:translate-y-0"
                            )}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Analizando Documento...
                                </>
                            ) : (
                                "Generar Resumen"
                            )}
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-200 text-center backdrop-blur-md">
                        {error}
                    </div>
                )}

                {summary && (
                    <div className="mt-8 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl ring-1 ring-white/5 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-blue-200">
                            Resumen
                        </h2>
                        <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed">
                            <p className="whitespace-pre-wrap">{summary}</p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
