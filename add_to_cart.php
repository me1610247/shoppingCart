<!-- add_to_cart.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="add_to_cart.css">
    <style>
  /* CSS styles for hiding/showing the cart */
  .card.hidden {
    display: none;
  }
</style>

</head>
<body class="">
    
    <div class="container">
        <header>
            <h1>Your Shopping Cart</h1>
            <div class="shopping">
                <img src="image/shopping.svg">
                <span class="quantity">0</span>
            </div>
        </header>

        <div class="list">
          
        </div>
    </div>
    <div id="cart" class="card">
        <h1>Card</h1>
        <ul class="listCard">
        </ul>
        <div class="checkOut">
            <div class="total">0</div>
            <div class="closeShopping">Close</div>
            <br>
            <button class="orderNow">Order Now</button>
        </div>
    </div>

    <script src="add_to_cart.js"></script>
    <script>
  // Get a reference to the close button and cart element
  const closeButton = document.querySelector('.closeShopping');
  const cart = document.getElementById('cart');

  // Add event listener to close button
  closeButton.addEventListener('click', function() {
    // Toggle 'hidden' class on cart element
    cart.classList.toggle('hidden');
  });
</script>
</body>
</html>