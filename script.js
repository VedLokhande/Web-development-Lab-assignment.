let expenses = [];

function addExpense() {
    let name = document.getElementById("name").value.trim();
    let amount = Number(document.getElementById("amount").value);
    let category = document.getElementById("category").value;
    let error = document.getElementById("error");

    // check the inputs
    if (name === "" || amount === 0) {
        error.innerText = "Please fill in all the fields.";
        return;
    }
    if (amount < 0) {
        error.innerText = "Amount must be greater than 0.";
        return;
    }

    error.innerText = "";
    expenses.push({ name: name, amount: amount, category: category });

    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";

    showExpenses();
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    showExpenses();
}

function showExpenses() {
    let filter = document.getElementById("filter").value;
    let list = document.getElementById("list");
    let total = 0;
    list.innerHTML = "";

    for (let i = 0; i < expenses.length; i++) {
        let e = expenses[i];

        if (filter === "All" || filter === e.category) {
            total = total + e.amount;
            list.innerHTML += `
                <li>
                    <div>
                        <strong>${e.name}</strong>
                        <span class="tag ${e.category}">${e.category}</span>
                    </div>
                    <div class="right">
                        <span>₹${e.amount}</span>
                        <button class="delete" onclick="deleteExpense(${i})">Delete</button>
                    </div>
                </li>`;
        }
    }

    // nothing to show
    if (list.innerHTML === "") {
        list.innerHTML = '<li class="empty">No expenses here yet.</li>';
    }

    document.getElementById("total").innerText = total;
}

document.getElementById("addBtn").addEventListener("click", addExpense);
document.getElementById("filter").addEventListener("change", showExpenses);

showExpenses();