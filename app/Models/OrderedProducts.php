<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderedProducts extends Model
{
    use HasFactory;

    protected $table = 'ordered_products';
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
    ];


    public function order(){
        return $this->belongsTo(Order::class);
    }

    public function product(){
        return $this->belongsTo(Product::class);
    }
}
