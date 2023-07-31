<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Item;
use App\Models\Product;
use Illuminate\Http\Request;

class CartController extends Controller
{
    function getUserCartAndItems($id){
        $user_cart=Cart::find($id);
        $cart_id=$user_cart->id;
        $get_items=Item::where("cart_id",$cart_id)->get();
        $products = [];
        foreach ($get_items as $get_items) {
            
            $get_Product_id=$get_items->product_id;
            $quantity=$get_items->quantity;

            $get_product=Product::where("id", $get_Product_id)->get();
            
            foreach ($get_product as $product) {
                $product->quantity = $quantity;
                $products[] = $product;
            }
        }

        return response()->json(['status' => 'success','user_cart'=>$user_cart,"cart_id"=>$cart_id,"user_items"=>$get_items,"products"=>$products]);

    }

    function removeItemFromCart($id){
        $getItems=Item::where("product_id",$id)->first();
        $getItems->delete();
        return response()->json(['status' => 'success']);
    }
}
