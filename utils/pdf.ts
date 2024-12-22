import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePdfFromHtml = async () => {
    const element = document.getElementById("exercise-list"); // ID do elemento a capturar

    if (!element) {
        console.error("Elemento não encontrado");
        return;
    }

    try {
        // Captura o conteúdo como canvas
        const canvas = await html2canvas(element, { scale: 2 });
        const imgData = canvas.toDataURL("image/png", 1.0);
        
        const pdf = new jsPDF("p", "mm", "a4");
        const pageHeight = pdf.internal.pageSize.height;
        const canvasHeight = canvas.height * 210 / canvas.width; // Altura proporcional à largura da página A4
        let position = 0;
        while (position < canvasHeight) {
            pdf.addImage(imgData, 'JPEG', 0, position, 210, canvasHeight - position < pageHeight ? canvasHeight - position : pageHeight);
            position += pageHeight;
            if (position < canvasHeight) pdf.addPage();
          }
        pdf.save("treino.pdf");
    } catch (error) {
        console.error("Erro ao gerar o PDF:", error);
    }
};