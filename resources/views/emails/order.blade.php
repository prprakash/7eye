<!doctype html>
<html lang="en">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    </head>
    <body>
        <main>
            <section class="py-5  container">
                <div class="row py-lg-5">
                    <div class='card'>
                        <div class='card-body'>
                            <h2>Customer Details</h2>
                            <table class='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td>{{ $customer['name'] }}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone</td>
                                        <td>{{ $customer['phone'] }}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td>{{ $customer['email'] }}</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td>{{ $customer['address'] }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <h2>Products</h2>
                            <table class='table table-bordered'>
                                <thead>
                                    <tr>
                                        <td>Product Name</td>
                                        <td>Unit Price</td>
                                        <td>Quantity</td>
                                        <td>Total</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    @foreach ($product as $key => $product)
                                        <tr>
                                            <td>{{ $product['name'] }}</td>
                                            <td>{{ $product['price'] }}</td>
                                            <td>{{ $product['quantity'] }}</td>
                                            <td>{{ $product['total_price'] }}</td>
                                        </tr>
                                    @endforeach
                                        
                                    <tr style="background: #cecece">
                                        <td colSpan={3} style="textAlign: right">Net Total</td>
                                        <td>{{ $order_total }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    <!-- Option 1: Bootstrap Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

    
  </body>
</html>