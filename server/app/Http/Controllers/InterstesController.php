<?php

namespace App\Http\Controllers;

use App\Models\Interest;
use Illuminate\Http\Request;

class InterstesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    function addToInterest($user_id, $cat_id) {
    $Interest = new Interest();
    $Interest->user_id = $user_id;
    $Interest->category_id = $cat_id;
    $Interest->save();

    return response()->json(['status' => 'success', 'user' => $Interest]);
}
}
