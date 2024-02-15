import * as XLSX from "xlsx";

export function handleDownloadExcel(dataDownload: {[key: string]: string | number}[], tituloDocumento: string, nombreArchivo: string) {
    const worksheet = XLSX.utils.json_to_sheet(dataDownload);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, tituloDocumento);
    const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
    });
    const data = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${nombreArchivo}.xlsx`;
    link.click();
}