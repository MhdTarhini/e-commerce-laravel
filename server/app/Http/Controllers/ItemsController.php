<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Item;
use Illuminate\Http\Request;

class ItemsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    function updateQuantity($direction,$id) {
        $get_item=Item::where('product_id',$id)->first();
        // $quantity=$get_item->quantity;
        if($direction=="up"){
            $get_item->quantity = $get_item->quantity+1;
        }else{
            if($get_item->quantity>1){
                $get_item->quantity = $get_item->quantity-1;
            }
        }
        $get_item->save();
        return response()->json(['status' => 'success',"item"=>$get_item]);
    }

    function addItem(Request $request){
        $user_id=$request->user_id;
        $get_user_cart_id=Cart::where('user_id',$user_id)->first();
        $add_item=new Item;
        $add_item->cart_id=$get_user_cart_id->id;
        $add_item->product_id = $request->product_id;
        $add_item->quantity = 1;
        $add_item->price = $request->price;
        $add_item->is_ordered = 0;
        $add_item->save();

        return response()->json(['status' => 'success',"item"=>$add_item]);
    }
}
