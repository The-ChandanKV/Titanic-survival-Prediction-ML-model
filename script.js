document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("predictionForm");
    const resultDiv = document.getElementById("result");

    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent page reload

        // Collect form data
        const data = {
            pclass: parseInt(document.getElementById("pclass").value),
            sex: document.getElementById("sex").value.toLowerCase(), // Ensure lowercase
            age: parseFloat(document.getElementById("age").value),
            sibsp: parseInt(document.getElementById("sibsp").value),
            parch: parseInt(document.getElementById("parch").value),
            fare: parseFloat(document.getElementById("fare").value),
            embarked: document.getElementById("embarked").value.toUpperCase() // Ensure uppercase
        };

        console.log("Sending Data:", data); // Debugging

        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Server Error: ${response.status}`);
            }

            const result = await response.json();
            console.log("Response:", result); // Debugging

            // Display result
            resultDiv.innerHTML = `<strong>Prediction:</strong> ${result.prediction}`;
            resultDiv.style.color = result.prediction === "Survived" ? "green" : "red";
        } catch (error) {
            console.error("Error:", error);
            resultDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
            resultDiv.style.color = "red";
        }
    });
});
