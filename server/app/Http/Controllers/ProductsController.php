<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    function getProducts(){
        $all_product=Product::get();
        return response()->json(['products'=>$all_product]);
    }
}

