<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoriesContoller extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    function getCategories(){
        $categories=Category::get();
        return response()->json(['categories'=>$categories]);
    }
}
