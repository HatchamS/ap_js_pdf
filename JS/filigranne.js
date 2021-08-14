const { degrees, PDFDocument, rgb, StandardFonts } = PDFLib
const body = document.body
var chargement = document.createElement("p");
chargement.textContent="Début du processus";

var upload = document.getElementById('pdfselector');

upload.addEventListener('change', function(e) {
  if (upload.files["0"].type == "application/pdf"){
    const reader = new FileReader();

    reader.onloadstart = function(){
      body.append(chargement);
    }
    reader.onload = async function(file) {
      const originpdf = file.target.result;
      const pdfDoc =  await PDFDocument.load(originpdf);

      const helveticaFont =  await pdfDoc.embedFont(StandardFonts.Helvetica);
      const filigranetext = document.getElementById("textinput").value;
      const pages = pdfDoc.getPages();
      
      const opacityuser = Number(document.getElementById('opacityuserinput').value);


      for (let index = 0; index < pages.length; index++) {
        let currentpage = pages[index];
        let { width, height } = currentpage.getSize();

        if (width > height) {
          currentpage.moveTo(width/3,height/4);
        }else {
          currentpage.moveTo(width/4,height/4);
        }
        currentpage.drawText(filigranetext, {
          size: 50,
          font: helveticaFont,
          color: rgb(0.95, 0.1, 0.1),
          rotate: degrees(45),
          opacity : opacityuser
        });


        
      }
      const pdfBytes = pdfDoc.save();

      if (document.getElementById('nomdesortie').value) {
        var namefile = document.getElementById('nomdesortie').value;

      } else{
        var namefile = upload.files[0]["name"]
      }
      
      chargement.textContent="Le processus s'est exécuté avec succès.";
      download(pdfBytes, namefile, "application/pdf");
    }

    reader.readAsArrayBuffer(upload.files[0]);

  } else {
    alert("Erreur veuillez choisir un document PDF.")
  }
});

