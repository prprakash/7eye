<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
  private $apiToken;
  public function __construct()
  {
    $this->apiToken = uniqid(base64_encode(Str::random(40)));
  }

  public function login(Request $request)
  {
    //User check
    if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
      $user = Auth::user();
      //Setting login response 
      $success['token'] = $this->apiToken;
      $success['name'] =  $user->name;
      return response()->json([
        'status' => 'success',
        'data' => $success
      ]);
    } else {
      return response()->json([
        'status' => 'error',
        'data' => 'Unauthorized Access'
      ]);
    }
  }

  public function logout(Request $request)
  {
    Auth::logout();

    return response()->json([
      'status' => 'success',
    ]);
  }
}
