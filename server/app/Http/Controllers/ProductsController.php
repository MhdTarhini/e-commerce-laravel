<?php

namespace App\Http\Controllers;

use App\Models\Interest;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductsController extends Controller
{
    function getProducts(){
        $all_product=Product::get();
        return response()->json(['products'=>$all_product]);
    }
    function editProduct(Request $request, $id="add"){
        if($id == "add"){
            $product = new Product;
        }else{
        $product=Product::find($id);
        }
        $product->name = $request->name;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->category_id = $request->category_id;
        $product->image = $request->image;
        $product->save();
        return response()->json(['status' => 'success','product'=>$product]);

    }
    function DeleteProduct($id){
        $product=Product::find($id);
        $product->delete();
        return response()->json(['status' => 'success','product'=>$product]);
    }

    function InterstedProduts($id){
        $getuser=Interest::where("user_id", $id)->get();
        if (!$getuser) {
        return response()->json(['status' => 'error', 'message' => 'Interest not found']);
    }
    $products = [];
    foreach ($getuser as $getuser) {


        $getCat_id=$getuser->category_id;


        $getproducts=Product::where("category_id", $getCat_id)->get();
        foreach ($getproducts as $product) {
        //  $productsByCategory[$getCat_id] = $getproducts;
        $products[] = $product;
        }
    };

        return response()->json(['status' => 'success','products'=>$products]);
    }
}

