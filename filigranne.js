const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib

var upload = document.getElementById('pdfselector');

upload.addEventListener('change', function(e) {
  if (upload.files["0"].type == "application/pdf"){
    const reader = new FileReader();

    reader.onload = async function(file) {
      let originpdf = file.target.result;
      const pdfDoc =  await PDFDocument.load(originpdf);

      const helveticaFont =  await pdfDoc.embedFont(StandardFonts.Helvetica);
      var filigranetext = document.getElementById("textinput").value;
      const pages = pdfDoc.getPages();
      const firstPage = pages[0];
      var opacityuser = Number(document.getElementById('opacityuserinput').value);
      const tailletexte = helveticaFont.widthOfTextAtSize(filigranetext, 50);

      for (let index = 0; index < pages.length; index++) {
        const currentpage = pages[index];
        const { width, height } = currentpage.getSize();

        currentpage.drawText(filigranetext, {
          x: (width - tailletexte)/2,
          y: (height - tailletexte)/2,
          size: 50,
          font: helveticaFont,
          color: rgb(0.95, 0.1, 0.1),
          rotate: degrees(45),
          opacity : opacityuser
        });
        
        
      }
      const pdfBytes = await pdfDoc.save();
      if (document.getElementById('nomdesortie').value) {
        var namefile = document.getElementById('nomdesortie').value;

      } else{
        var namefile = upload.files[0]["name"]
      }

      download(pdfBytes, namefile, "application/pdf");
    
    }
    reader.readAsArrayBuffer(upload.files[0]);
  } else {
    alert("Erreur veuillez choisir un document PDF.")
  }
});



  

  