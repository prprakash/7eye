<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\Customer;
use App\Jobs\SendEmailJob;
use Illuminate\Http\Request;
use App\Models\OrderedProducts;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orders = Order::with('customer')->orderBy('created_at', 'desc')->get();
        return $orders->toJson();
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
        $order = new Order();
        $order->customer_id = $request->customer_id;
        $order->save();
        $order_id = $order->id;

        $status = false;
        foreach ($request->item as $key => $product) {
            $item = new OrderedProducts();
            $item->order_id = $order_id;
            $item->product_id = $product['id'];
            $item->quantity = $product['quantity'];
            if($item->save()){
                $status = true;
            }
        }

        if($status){
            $order = Order::findOrFail($order_id);
            $details['customer']['name'] = $order->customer->name;
            $details['customer']['phone'] = $order->customer->phone;
            $details['customer']['email'] = $order->customer->email;
            $details['customer']['address'] = $order->customer->address;

            $orders = OrderedProducts::with('product')->where('order_id', $order->id)->get();
            $order_total = 0;
            foreach ($orders as $key => $order) {
                $details['product'][$key]['name'] = $order->product->name;
                $details['product'][$key]['price'] = $order->product->price;
                $details['product'][$key]['quantity'] = $order->quantity;
                $details['product'][$key]['total_price'] = number_format(($order->product->price * $order->quantity), 2, '.', ',');
                $order_total += ($order->product->price * $order->quantity);
            }
            $details['order_total'] = number_format($order_total, 2, '.', ',');

            Mail::send('emails.order', $details, function ($message) use ($details) {
                $message->from('us@example.com', 'Laravel');
                $message->to($details['customer']['email']);
                $message->subject('Order Placed');
            });
            //dispatch(new \App\Jobs\SendEmailJob($details));
            //dispatch(new SendEmailJob($details));
            return response()->json([
                'message' => 'Order created!'
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
    public function show(Order $order)
    {
        $data['id'] = $order->id;
        $data['customer']['name'] = $order->customer->name;
        $data['customer']['phone'] = $order->customer->phone;
        $data['customer']['email'] = $order->customer->email;
        $data['customer']['address'] = $order->customer->address;

        $orders = OrderedProducts::with('product')->where('order_id', $order->id)->get();
        $order_total = 0;
        foreach ($orders as $key => $order) {
            $data['product'][$key]['name'] = $order->product->name;
            $data['product'][$key]['price'] = $order->product->price;
            $data['product'][$key]['quantity'] = $order->quantity;
            $data['product'][$key]['total_price'] = number_format(($order->product->price * $order->quantity), 2, '.', ',');
            $order_total += ($order->product->price * $order->quantity);
        }
        $data['order_total'] = number_format($order_total, 2, '.', ',');
        return json_encode($data);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Order $order)
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
    public function destroy(Order $order)
    {
        if(Order::destroy($order->id)){
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
