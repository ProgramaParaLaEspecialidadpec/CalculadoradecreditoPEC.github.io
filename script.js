function calculateAmortization() {
  var loanAmount = parseFloat(document.getElementById("loanAmount").value);
  var loanTerm = parseInt(document.getElementById("loanTerm").value);
  var interestRate = parseFloat(document.getElementById("interestRate").value);
  var interestType = document.getElementById("interestType").value;

  var monthlyInterestRate;
  if (interestType === "mensual") {
    monthlyInterestRate = interestRate / 100;
  } else if (interestType === "anual") {
    monthlyInterestRate = interestRate / 100 / 12;
  }

  var monthlyPayment = loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -loanTerm));

  var amortizationTable = document.getElementById("amortizationTable");
  amortizationTable.innerHTML = "";

  var table = document.createElement("table");
  var headerRow = table.insertRow();
  var headerCell1 = headerRow.insertCell(0);
  var headerCell2 = headerRow.insertCell(1);
  var headerCell3 = headerRow.insertCell(2);
  var headerCell4 = headerRow.insertCell(3);
  headerCell1.textContent = "Mes";
  headerCell2.textContent = "Intereses a pagar";
  headerCell3.textContent = "Abono a capital";
  headerCell4.textContent = "Saldo Obligación";

  var remainingBalance = loanAmount;
  for (var i = 1; i <= loanTerm; i++) {
    var interestPayment = remainingBalance * monthlyInterestRate;
    var principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.textContent = i;
    cell2.textContent = "$" + interestPayment.toFixed(2);
    cell3.textContent = "$" + principalPayment.toFixed(2);
    cell4.textContent = "$" + remainingBalance.toFixed(2);
  }

  amortizationTable.appendChild(table);

  var totalInterest = (monthlyPayment * loanTerm) - loanAmount;
  var totalPayment = loanAmount + totalInterest;

  document.getElementById("totalPayment").textContent = "$" + totalPayment.toFixed(2);
  document.getElementById("totalInterest").textContent = "$" + totalInterest.toFixed(2);
  document.getElementById("monthlyPayment").textContent = "$" + monthlyPayment.toFixed(2);
}

function resetForm() {
  document.getElementById("loanAmount").value = "";
  document.getElementById("loanTerm").value = "";
  document.getElementById("interestRate").value = "";
  document.getElementById("amortizationTable").innerHTML = "";
  document.getElementById("totalPayment").textContent = "";
  document.getElementById("totalInterest").textContent = "";
  document.getElementById("monthlyPayment").textContent = "";
}