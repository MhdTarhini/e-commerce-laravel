<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SignUp_Controller extends Controller
{
        public function __construct()
    {
        $this->middleware('auth:api');
    }
}
