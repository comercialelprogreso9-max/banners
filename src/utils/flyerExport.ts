import { toPng } from 'html-to-image';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// Helper to wait for all images inside an element to be completely loaded
async function waitForImagesToLoad(element: HTMLElement): Promise<void> {
  const images = Array.from(element.querySelectorAll('img'));
  const promises = images.map((img) => {
    if (img.complete && img.naturalWidth > 0) return Promise.resolve();
    return new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Don't block export on failed image
    });
  });
  await Promise.all(promises);
}

export async function downloadFlyerAsPng(element: HTMLElement, filename = 'Flyer_Comercial_El_Progreso.png') {
  try {
    await waitForImagesToLoad(element);

    // Try html-to-image first with optimal settings
    let dataUrl: string;
    try {
      dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: false,
        style: {
          transform: 'none',
        },
      });
    } catch (toPngErr) {
      console.warn('toPng attempt failed, switching to html2canvas:', toPngErr);
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: null,
        logging: false,
        imageTimeout: 15000,
        windowWidth: element.offsetWidth || 1000,
        windowHeight: element.offsetHeight || 1200,
      });
      dataUrl = canvas.toDataURL('image/png', 1.0);
    }

    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } catch (err) {
    console.error('Failed to export flyer as PNG:', err);
    throw err;
  }
}

export async function downloadFlyerAsPdf(element: HTMLElement, filename = 'Flyer_Comercial_El_Progreso.pdf') {
  try {
    await waitForImagesToLoad(element);

    let dataUrl: string;
    try {
      dataUrl = await toPng(element, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: false,
        style: {
          transform: 'none',
        },
      });
    } catch {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        backgroundColor: null,
        logging: false,
        windowWidth: element.offsetWidth || 1000,
        windowHeight: element.offsetHeight || 1200,
      });
      dataUrl = canvas.toDataURL('image/png', 1.0);
    }

    const isLandscape = element.offsetWidth > element.offsetHeight;
    const pdf = new jsPDF(isLandscape ? 'l' : 'p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
    return true;
  } catch (err) {
    console.error('Failed to export flyer as PDF:', err);
    throw err;
  }
}

