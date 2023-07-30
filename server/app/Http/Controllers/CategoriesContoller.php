<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoriesContoller extends Controller
{
    function getCategories(){
        $categories=Category::get();
        return response()->json(['categories'=>$categories]);
    }
}
