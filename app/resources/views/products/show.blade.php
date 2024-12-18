<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $product->name }}</title>
</head>
<body>
    <h1>{{ $product->title }}</h1>
    <p>{{ $product->link }}</p>
    <p>Prix : {{ $product->price }} €</p>
    <a href="{{ route('products.index') }}">Retour à la liste des produits</a>
</body>
</html>
