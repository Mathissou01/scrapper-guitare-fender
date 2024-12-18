<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::get('/', function () {
    return view('welcome');
});


// Route pour afficher la liste des produits
Route::get('/products', [ProductController::class, 'index'])->name('products.index');


Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');
