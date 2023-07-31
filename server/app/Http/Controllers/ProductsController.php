<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Interest;
use App\Models\Product;
use Illuminate\Http\Request;
use SebastianBergmann\CodeUnit\FunctionUnit;

class ProductsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

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
        $products[] = $product;
        }
    };
    return response()->json(['status' => 'success','products'=>$products]);
}
Function getProductByCategory($id){
    $products=Product::where("category_id", $id)->get();
    return response()->json(['status' => 'success','products'=>$products]);

}
function getUserFavorites($id) {
    $get_user_fav=Favorite::where("user_id",$id)->get();

    $products = [];
    foreach ($get_user_fav as $user_fav) {
        
        $get_fav_products_id= $user_fav->product_id;

        $getproduct=Product::where("id", $get_fav_products_id)->get();

        foreach ($getproduct as $product) {
          $products[] = $product;
        }
    };

    return response()->json(['status' => 'success','user'=>$get_user_fav,"products"=>$products]);
    
}
}

