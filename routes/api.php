<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::post('login', [AuthController::class, 'login'])->name('login');
Route::post('logout', [AuthController::class, 'logout'])->name('logout');

//Route::group(['middleware' => ['auth:sanctum']], function() {
    //Customer API Routes
    Route::get('customers',  [CustomerController::class, 'index']);
    Route::post('customer/create', [CustomerController::class, 'store']);
    Route::get('customer/edit/{customer:id}', [CustomerController::class, 'show']);
    Route::post('customer/update', [CustomerController::class, 'update']);
    Route::delete('customer/delete/{customer:id}', [CustomerController::class, 'destroy']);

    //Product API Routes
    Route::get('products',  [ProductController::class, 'index']);
    Route::post('product/create', [ProductController::class, 'store']);
    Route::get('product/edit/{product:id}', [ProductController::class, 'show']);
    Route::post('product/update', [ProductController::class, 'update']);
    Route::delete('product/delete/{product:id}', [ProductController::class, 'destroy']);

    //Product API Routes
    Route::get('orders',  [OrderController::class, 'index']);
    Route::post('order/create', [OrderController::class, 'store']);
    Route::get('order/show/{order:id}', [OrderController::class, 'show']);
    Route::post('order/update', [OrderController::class, 'update']);
    Route::delete('order/delete/{order:id}', [OrderController::class, 'destroy']);
//});

