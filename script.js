document.getElementById('jobForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const totalEstimate = parseFloat(document.getElementById('totalEstimate').value);
    const downpaymentPercent = parseFloat(document.getElementById('downpayment').value);
    const numberOfPhases = parseInt(document.getElementById('phases').value);

    // Calculate total downpayment amount
    const downpaymentTotal = (downpaymentPercent / 100) * totalEstimate;
    let resultHTML = '';

    for (let i = 1; i <= numberOfPhases; i++) {
        const phaseValue = parseFloat(document.getElementById(`phaseValue${i}`).value);

        // Calculate downpayment for the current phase
        const pulledFromDownpayment = (downpaymentPercent / 100) * phaseValue;
        const billedToCustomer = phaseValue - pulledFromDownpayment;

        resultHTML += `
            <h3>Phase ${i}</h3>
            <p>Phase Value: $${phaseValue.toFixed(2)}</p>
            <p>Pulled from Downpayment: $${pulledFromDownpayment.toFixed(2)}</p>
            <p>Billed to Customer: $${billedToCustomer.toFixed(2)}</p>
            <hr>
        `;
    }

    document.getElementById('results').innerHTML = resultHTML;
});

// Dynamically generate phase input fields based on number of phases
document.getElementById('phases').addEventListener('change', function() {
    const numberOfPhases = parseInt(this.value);
    let phaseInputsHTML = '';

    for (let i = 1; i <= numberOfPhases; i++) {
        phaseInputsHTML += `
            <div class="form-group">
                <label for="phaseValue${i}">Phase ${i} Value ($):</label>
                <input type="number" id="phaseValue${i}" required>
            </div>
        `;
    }

    document.getElementById('phaseInputs').innerHTML = phaseInputsHTML;
});
