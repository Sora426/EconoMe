pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

const canvas = document.getElementById("pdf-render");
const ctx = canvas.getContext("2d");

let pdfDoc = null;
let pageNum = 1;

pdfjsLib.getDocument(pdfUrl).promise.then(pdf => {

    pdfDoc = pdf;

    document.getElementById("page-count").textContent = pdf.numPages;

    renderPage(pageNum);

}).catch(err => {

    console.error(err);

});

function renderPage(num){

    pdfDoc.getPage(num).then(page=>{

        const viewport = page.getViewport({scale:1.5});

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        page.render({

            canvasContext:ctx,
            viewport

        });

        document.getElementById("page-num").textContent = num;

    });

}

document.getElementById("prev").onclick = ()=>{

    if(pageNum<=1) return;

    pageNum--;

    renderPage(pageNum);

};

document.getElementById("next").onclick = ()=>{

    if(pageNum>=pdfDoc.numPages) return;

    pageNum++;

    renderPage(pageNum);

};