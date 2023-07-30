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
    function makeAdmin($id){
        $user=User::find($id);
        $user->role_id = 1;
        $user->save();
        return response()->json(['status' => 'success','users'=>$user]);

    }
}
