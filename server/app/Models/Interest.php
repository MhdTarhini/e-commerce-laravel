<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interest extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'category_id'];


    public function products()
    {
       return $this->hasMany(Product::class, 'category_id', 'category_id');
    }

}
