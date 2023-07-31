<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoritesController extends Controller
{
    function addProduct(Request $request){
        $fav=new Favorite;
        $fav->user_id = $request->user_id;
        $fav->product_id = $request->product_id;
        $fav->save();
        return response()->json(["status"=>'success']);
    }
    function removeProduct($product_id){
        $fav=Favorite::where('product_id',$product_id)->first();
        $fav->delete();
        return response()->json(["status"=>'success']);
    }
}
