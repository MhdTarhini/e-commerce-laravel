<?php

use App\Http\Controllers\SignUp_Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Lcobucci\JWT\Signer\Ecdsa\SignatureConverter;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CategoriesContoller;
use App\Http\Controllers\FavoritesController;
use App\Http\Controllers\InterstesController;
use App\Http\Controllers\ItemsController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\UsersController;

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

Route::get("/get_all_users",[UsersController::class,"getUsers"]);
Route::get("/make_admin/{id?}",[UsersController::class,"makeAdmin"]);
Route::post("/edit_product/{id?}",[ProductsController::class,"editProduct"]);
Route::get("/get_product_by_category/{id?}",[ProductsController::class,"getProductByCategory"]);
Route::get("/user_interest/{id?}",[ProductsController::class,"InterstedProduts"]);
Route::delete("/delete_product/{id?}",[ProductsController::class,"deleteProduct"]);
Route::get("/get_all_products",[ProductsController::class,"getProducts"]);
Route::get("/add_products",[ProductsController::class,"getProducts"]);
Route::get("/get_user_fav/{id?}",[ProductsController::class,"getUserFavorites"]);
Route::get("/get_all_categories",[CategoriesContoller::class,"getCategories"]);
Route::get("/get_cart_items/{id?}",[CartController::class,"getUserCartAndItems"]);
Route::delete("/remove_cart_items/{id?}",[CartController::class,"removeItemFromCart"]);
Route::get("/update-quantity/{direction?}/{id?}",[ItemsController::class,"updateQuantity"]);
Route::post("/add_to_fav",[FavoritesController::class,"addProduct"]);
Route::delete("/remove_fav/{product_id?}",[FavoritesController::class,"removeProduct"]);

Route::get("/add_interste/{user_id?}/{cat_id?}",[InterstesController::class,"addToInterest"]);


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
