# 📄 Resumidor de PDF con IA

¡Bienvenido al **Resumidor de PDF**! Una aplicación web moderna y elegante diseñada para simplificar tu lectura. Sube cualquier documento PDF y obtén un resumen instantáneo, detallado y estructurado, impulsado por la inteligencia artificial.

## ✨ Características

*   **Análisis Inteligente**: Utiliza modelos de IA avanzados (vía OpenRouter) para entender y condensar el contenido de tus documentos.
*   **Resúmenes en Español**: Genera resúmenes claros y coherentes en español, independientemente del idioma original del texto (dependiendo del modelo).
*   **Interfaz Premium**: Diseño moderno con efectos de vidrio (glassmorphism), gradientes dinámicos y animaciones suaves.
*   **Fácil de Usar**: Sube archivos mediante "arrastrar y soltar" (drag & drop) o con un simple clic.
*   **Feedback Instantáneo**: Indicadores de carga y mensajes de error claros para una mejor experiencia de usuario.

## 🛠️ Tecnologías

Este proyecto está construido con las tecnologías web más modernas:

*   **[Next.js 14](https://nextjs.org/)**: El framework de React para producción.
*   **[TypeScript](https://www.typescriptlang.org/)**: Para un código más robusto y seguro.
*   **[Tailwind CSS](https://tailwindcss.com/)**: Para un diseño rápido y altamente personalizable.
*   **[OpenRouter API](https://openrouter.ai/)**: Acceso a múltiples modelos de LLM (como Gemini, Llama, Mistral) para la generación de resúmenes.
*   **pdf-parse**: Para la extracción de texto desde archivos PDF.
*   **Lucide React**: Iconos hermosos y ligeros.

## 🚀 Comenzando

Sigue estos pasos para ejecutar el proyecto en tu máquina local.

### Prerrequisitos

*   Node.js 18+ instalado.
*   npm o yarn.

### Instalación

1.  **Clona el repositorio**:
    ```bash
    git clone https://github.com/nadiabautista5-del/resumen-pdf.git
    cd resumen-pdf
    ```

2.  **Instala las dependencias**:
    ```bash
    npm install
    ```

3.  **Configura las variables de entorno**:
    Crea un archivo `.env.local` en la raíz del proyecto y añade tu clave de API de OpenRouter:
    ```env
    OPENROUTER_API_KEY=tu_clave_api_aqui
    ```

4.  **Inicia el servidor de desarrollo**:
    ```bash
    npm run dev
    ```

5.  **Abre la aplicación**:
    Visita [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si tienes ideas para mejorar este proyecto, no dudes en abrir un *issue* o enviar un *pull request*.

1.  Haz un Fork del proyecto.
2.  Crea tu rama de características (`git checkout -b feature/AmazingFeature`).
3.  Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`).
4.  Haz Push a la rama (`git push origin feature/AmazingFeature`).
5.  Abre un Pull Request.

---
Hecho con ❤️ por [Nadia Bautista](https://github.com/nadiabautista5-del)
