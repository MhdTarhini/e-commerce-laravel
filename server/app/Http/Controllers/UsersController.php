<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    function getUsers(){
        $users=User::get();
        return response()->json(['status' => 'success','users'=>$users]);
    }
}
