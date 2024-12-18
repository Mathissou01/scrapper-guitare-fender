<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Afficher la liste des produits
    public function index()
    {
        // Récupérer tous les produits de la base de données
        $products = Product::all();

        // Retourner la vue 'products.index' avec les produits
        return view('products.index', compact('products'));
    }

    // Afficher un produit spécifique
    public function show($id)
    {
        // Trouver un produit par son ID
        $product = Product::findOrFail($id);

        // Retourner la vue 'products.show' avec le produit
        return view('products.show', compact('product'));
    }
}
