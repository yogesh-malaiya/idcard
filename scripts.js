document.getElementById('idCardForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const aadhaar = document.getElementById('aadhaar').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const guruDikshaDate = document.getElementById('guruDikshaDate').value;
    const photo = document.getElementById('photo').files[0];

    const readerPhoto = new FileReader();
    readerPhoto.onload = function(e) {
        document.getElementById('profilePic').src = e.target.result;
    };
    readerPhoto.readAsDataURL(photo);

    document.getElementById('fullName').textContent = name;
    document.getElementById('aadhaarNumber').textContent = `Aadhaar: ${aadhaar}`;
    document.getElementById('emailAddress').textContent = `Email: ${email}`;
    document.getElementById('phoneNumber').textContent = `Phone: ${phone}`;
    document.getElementById('homeAddress').textContent = `Address: ${address}`;
    document.getElementById('dikshaDate').textContent = `Guru Diksha Date: ${guruDikshaDate}`;

    const membershipDate = new Date();
    const validityDate = new Date();
    validityDate.setFullYear(validityDate.getFullYear() + 1);

    document.getElementById('membershipDate').textContent = `Membership Date: ${membershipDate.toISOString().split('T')[0]}`;
    document.getElementById('validityDate').textContent = `Valid Until: ${validityDate.toISOString().split('T')[0]}`;

    document.getElementById('idCardFront').style.display = 'block';
    document.getElementById('idCardBack').style.display = 'block';

    // Adjust the height of the back ID card to match the front ID card
    const frontHeight = document.getElementById('idCardFront').offsetHeight;
    document.getElementById('idCardBack').style.height = `${frontHeight}px`;
});

document.getElementById('downloadPDF').addEventListener('click', function() {
    const idCardFront = document.getElementById('idCardFront');
    const idCardBack = document.getElementById('idCardBack');

    html2canvas(idCardFront).then(canvasFront => {
        const imgDataFront = canvasFront.toDataURL('image/png');
        const frontHeight = canvasFront.height;
        const frontWidth = canvasFront.width;

        // Adjust the back ID card canvas height to match the front ID card canvas height
        idCardBack.style.height = `${frontHeight}px`;

        html2canvas(idCardBack).then(canvasBack => {
            const imgDataBack = canvasBack.toDataURL('image/png');
            const backHeight = canvasBack.height;
            const backWidth = canvasBack.width;

            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');

            // Get the dimensions of the canvas
            const pdfWidth = 210; // A4 width in mm
            const pdfHeightFront = (frontHeight * pdfWidth) / frontWidth;
            const pdfHeightBack = (backHeight * pdfWidth) / backWidth;

            pdf.addImage(imgDataFront, 'PNG', 0, 0, pdfWidth, pdfHeightFront);
            pdf.addPage();
            pdf.addImage(imgDataBack, 'PNG', 0, 0, pdfWidth, pdfHeightBack);

            pdf.save('id_card.pdf');
        });
    });
});













// document.getElementById('idCardForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     const name = document.getElementById('name').value;
//     const aadhaar = document.getElementById('aadhaar').value;
//     const email = document.getElementById('email').value;
//     const phone = document.getElementById('phone').value;
//     const address = document.getElementById('address').value;
//     const guruDikshaDate = document.getElementById('guruDikshaDate').value;
//     const photo = document.getElementById('photo').files[0];

//     const readerPhoto = new FileReader();
//     readerPhoto.onload = function(e) {
//         document.getElementById('profilePic').src = e.target.result;
//     };
//     readerPhoto.readAsDataURL(photo);

//     document.getElementById('fullName').textContent = name;
//     document.getElementById('aadhaarNumber').textContent = `Aadhaar: ${aadhaar}`;
//     document.getElementById('emailAddress').textContent = `Email: ${email}`;
//     document.getElementById('phoneNumber').textContent = `Phone: ${phone}`;
//     document.getElementById('homeAddress').textContent = `Address: ${address}`;
//     document.getElementById('dikshaDate').textContent = `Guru Diksha Date: ${guruDikshaDate}`;

//     const membershipDate = new Date();
//     const validityDate = new Date();
//     validityDate.setFullYear(validityDate.getFullYear() + 1);

//     document.getElementById('membershipDate').textContent = `Membership Date: ${membershipDate.toISOString().split('T')[0]}`;
//     document.getElementById('validityDate').textContent = `Valid Until: ${validityDate.toISOString().split('T')[0]}`;

//     document.getElementById('idCardFront').style.display = 'block';
//     document.getElementById('idCardBack').style.display = 'block';
    
//     // Adjust the height of the back ID card to match the front ID card
//     const frontHeight = document.getElementById('idCardFront').offsetHeight;
//     document.getElementById('idCardBack').style.height = `${frontHeight}px`;
// });

// document.getElementById('downloadPDF').addEventListener('click', function() {
//     const idCardFront = document.getElementById('idCardFront');
//     const idCardBack = document.getElementById('idCardBack');

//     html2canvas(idCardFront).then(canvasFront => {
//         const imgDataFront = canvasFront.toDataURL('image/png');
//         const frontHeight = canvasFront.height;
//         const frontWidth = canvasFront.width;

//         // Adjust the back ID card canvas height to match the front ID card canvas height
//         idCardBack.style.height = `${frontHeight}px`;

//         html2canvas(idCardBack).then(canvasBack => {
//             const imgDataBack = canvasBack.toDataURL('image/png');
//             const backHeight = canvasBack.height;
//             const backWidth = canvasBack.width;

//             const { jsPDF } = window.jspdf;
//             const pdf = new jsPDF('p', 'mm', [(Math.max(frontHeight, backHeight) * 210) / Math.max(frontWidth, backWidth), 210]);

//             pdf.addImage(imgDataFront, 'PNG', 0, 0, 210, (210 * frontHeight) / frontWidth);
//             pdf.addPage();
//             pdf.addImage(imgDataBack, 'PNG', 0, 0, 210, (210 * backHeight) / backWidth);

//             pdf.save('id_card.pdf');
//         });
//     });
// });


