/* scripts.js */
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
    
    const membershipDate = new Date(); // Replace with actual membership date logic if needed
    const validityDate = new Date();
    validityDate.setFullYear(validityDate.getFullYear() + 1);

    document.getElementById('membershipDate').textContent = `Membership Date: ${membershipDate.toISOString().split('T')[0]}`;
    document.getElementById('validityDate').textContent = `Valid Until: ${validityDate.toISOString().split('T')[0]}`;

    document.getElementById('idCardFront').style.display = 'block';
    document.getElementById('idCardBack').style.display = 'block';
});

document.getElementById('downloadPNG').addEventListener('click', function() {
    const idCardFront = document.getElementById('idCardFront');
    const idCardBack = document.getElementById('idCardBack');
    html2canvas(idCardFront).then(canvasFront => {
        html2canvas(idCardBack).then(canvasBack => {
            const link = document.createElement('a');
            link.download = 'id_card_front.png';
            link.href = canvasFront.toDataURL('image/png');
            link.click();
            link.download = 'id_card_back.png';
            link.href = canvasBack.toDataURL('image/png');
            link.click();
        });
    });
});

document.getElementById('downloadPDF').addEventListener('click', function() {
    const idCardFront = document.getElementById('idCardFront');
    const idCardBack = document.getElementById('idCardBack');
    html2canvas(idCardFront).then(canvasFront => {
        html2canvas(idCardBack).then(canvasBack => {
            const pdf = new jsPDF('p', 'mm', [297, 210]); // A4 size
            pdf.addImage(canvasFront.toDataURL('image/png'), 'PNG', 10, 10, 190, 0);
            pdf.addPage();
            pdf.addImage(canvasBack.toDataURL('image/png'), 'PNG', 10, 10, 190, 0);
            pdf.save('id_card.pdf');
        });
    });
});
