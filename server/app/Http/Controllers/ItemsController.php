<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemsController extends Controller
{
    function updateQuantity($direction,$id) {
        $get_item=Item::where('product_id',$id)->first();
        // $quantity=$get_item->quantity;
        if($direction=="up"){
            $quantity=$get_item->quantity = $get_item->quantity+1;
        }else{
            $quantity=$get_item->quantity = $get_item->quantity-1;
        }
        $get_item->save();
        return response()->json(['status' => 'success',"quantity"=>$quantity,"item"=>$get_item]);
    }
}
