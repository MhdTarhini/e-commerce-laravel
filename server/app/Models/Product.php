<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description','price','image','category_id'];

    public function interest()
{
    return $this->belongsTo(Interest::class, 'category_id', 'category_id');
}
    
}
