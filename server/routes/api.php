<?php

use App\Http\Controllers\SignUp_Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Lcobucci\JWT\Signer\Ecdsa\SignatureConverter;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriesContoller;
use App\Http\Controllers\ProductsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');

});

Route::post("/edit_product/{id?}",[ProductsController::class,"editProduct"]);
Route::delete("/delete_product/{id?}",[ProductsController::class,"deleteProduct"]);
Route::get("/get_all_products",[ProductsController::class,"getProducts"]);
Route::get("/add_products",[ProductsController::class,"getProducts"]);
Route::get("/get_all_categories",[CategoriesContoller::class,"getCategories"]);


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
