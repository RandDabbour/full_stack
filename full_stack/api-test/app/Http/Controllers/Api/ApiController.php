<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class ApiController extends Controller
{
    public function register (Request $request)
    {
        $request->validate([
            'name'=>'required',
            'email'=>'required|email|unique:users',
            'password'=>'required|confirmed'
        ]);
        User::create([
            'name' =>$request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);

        return response()->json([
            'status'=>true,
            'message' => 'User registerd successfully'
        ]);



    }

    public function login (Request $request)
    {

        $request->validate([
            'email' =>'required|email',
            'password' =>'required'
        ]);

        $user = User::where('email' , $request->email)->first();

        if(!empty($user)){

            if(Hash::check($request->password, $user->password )){
                $token = $user->createToken('myToken')->plainTextToken;

                return response()->json([
                    'status'=> true,
                    'message' => 'login success',
                    'token' =>$token
                ]);

            }
            return response()->json([
                'status'=>false,
                'message' =>'Password did not match'
            ]);

        }
        return response()->json([
            'status' => false,
            'message' =>'Invalid login'
        ]);
    }

    public function profile (){

        $data = auth()->user();
        return response()->json([
            'status' => true,
            'message' => 'pforile data',
            'user' =>$data
        ]);

    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'status' => true,
            'message' => 'User logged out'
        ]);

    }
}
