<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::orderBy('created_at', 'desc')->get();
        return $products->toJson();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

   
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'min_quantity' => 'required',
            'price' => 'required',
            'stock' => 'required',
        ]);

        $product = new Product();
        $product->name = $request->name;
        $product->min_quantity = $request->min_quantity;
        $product->price = $request->price;
        $product->stock = $request->stock;

        if($product->save()){
            return response()->json([
                'message' => 'Product created!'
            ], 201);
        }else{
            return response()->json([
                'message' => 'Something went wrong!'
            ], 409);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return $product->toJson();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'min_quantity' => 'required',
            'price' => 'required',
            'stock' => 'required',
        ]);

        $product = Product::findOrFail($request->id);
        $product->name = $request->name;
        $product->min_quantity = $request->min_quantity;
        $product->price = $request->price;
        $product->stock = $request->stock;

        if($product->save()){
            return response()->json([
                'message' => 'Product Updated!'
            ], 201);
        }else{
            return response()->json([
                'message' => 'Something went wrong!'
            ], 409);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        if(Product::destroy($product->id)){
            return response()->json([
                'message' => 'Product Deleted!'
            ], 201);
        }else{
            return response()->json([
                'message' => 'Something went wrong!'
            ], 409);
        }
    }
}
