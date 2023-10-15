<?php
$con = mysqli_connect("localhost", "root", "", "shams");
if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
}

// Retrieve order details from the request
$data = json_decode(file_get_contents("php://input"), true);

// Validate and sanitize the input data
// ...

// Loop through the received data and save each item in the database
foreach ($data as $item) {
    $productName = mysqli_real_escape_string($con, $item['product_name']);
    $quantity = mysqli_real_escape_string($con, $item['quantity']);
    $total_price = mysqli_real_escape_string($con, $item['totalPrice']);

    // Construct the SQL query
    $sql = "INSERT INTO orders (product_name,quantity,total_price) VALUES ('$productName', '$quantity','$total_price')";

    if (mysqli_query($con, $sql)) {
        echo "Order details saved successfully!";
    } else {
        echo "Error saving order details: " . mysqli_error($con);
    }
}

// Close the database connection
mysqli_close($con);
?>